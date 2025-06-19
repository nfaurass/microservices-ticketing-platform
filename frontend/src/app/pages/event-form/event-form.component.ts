import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

interface TicketType {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-event-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './event-form.component.html',
  standalone: true,
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  isEdit = false;

  event = {
    title: '',
    date: '',
    venue: '',
    description: '',
    ticketTypes: [] as TicketType[],
  };

  newTicket: TicketType = {name: '', price: 0, quantity: 0};

  ngOnInit() {
    if (this.isEdit) {
      this.event = {
        title: 'Tech Conference 2025',
        date: '2025-09-10',
        venue: 'Moscone Center, SF',
        description: 'An in-depth conference about emerging tech.',
        ticketTypes: [
          {name: 'General Admission', price: 100, quantity: 300},
          {name: 'VIP', price: 250, quantity: 100},
        ],
      };
    }
  }

  addTicketType() {
    if (this.newTicket.name && this.newTicket.price > 0 && this.newTicket.quantity > 0) {
      this.event.ticketTypes.push({...this.newTicket});
      this.newTicket = {name: '', price: 0, quantity: 0};
    }
  }

  removeTicketType(index: number) {
    this.event.ticketTypes.splice(index, 1);
  }

  submit() {
    if (this.isEdit) {
      console.log('Updating event:', this.event);
    } else {
      console.log('Creating event:', this.event);
    }
  }

}
