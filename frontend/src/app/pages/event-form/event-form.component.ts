import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {EventsService} from '../../events.service';

interface TicketType {
  name: string;
  price: number;
  available: number;
  description: string;
}

@Component({
  selector: 'app-event-form',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './event-form.component.html',
  standalone: true,
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  constructor(private eventsService: EventsService) {
  }

  isEdit = false;

  event = {
    title: '',
    date: '',
    venue: '',
    description: '',
    imageUrl: '',
    ticketTypes: [] as TicketType[],
  };

  newTicket: TicketType = {name: '', price: 0, available: 0, description: ""};

  ngOnInit() {
    if (this.isEdit) {
      this.event = {
        title: 'Tech Conference 2025',
        date: '2025-09-10',
        venue: 'Moscone Center, SF',
        description: 'An in-depth conference about emerging tech.',
        imageUrl: "",
        ticketTypes: [
          {name: 'General Admission', price: 100, available: 300, description: ""},
          {name: 'VIP', price: 250, available: 100, description: ""},
        ],
      };
    }
  }

  addTicketType() {
    if (this.newTicket.name && this.newTicket.price > 0 && this.newTicket.available > 0) {
      this.event.ticketTypes.push({...this.newTicket});
      this.newTicket = {name: '', price: 0, available: 0, description: ""};
    }
  }

  removeTicketType(index: number) {
    this.event.ticketTypes.splice(index, 1);
  }

  submit() {
    if (this.isEdit) {
      console.log('Updating event:', this.event);
    } else {
      const response = this.eventsService.createEvent(this.event).subscribe({
        next: (res) => {
          console.log(res);
        }, error: (err) => {
          console.log(err);
        }
      });
      console.log(response);
    }
  }

}
