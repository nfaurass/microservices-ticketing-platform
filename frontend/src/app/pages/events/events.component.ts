import {Component} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {EventsService, Event} from '../../events.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './events.component.html',
  standalone: true,
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: Event[] = [];

  constructor(private eventsService: EventsService, private router: Router) {
  }

  onSelectEvent(event: Event) {
    this.router.navigate(['/events', event._id]);
  }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Error loading events', err);
      }
    });
  }

  getPriceFrom(event: Event): number {
    const prices = event.ticketTypes.flatMap(ticket =>
      ticket.ticketTypes.map(tt => tt.price)
    );
    return Math.min(...prices);
  }

  getTicketsAvailable(event: Event): number {
    return event.ticketTypes.reduce((total, ticket) => {
      return total + ticket.ticketTypes.reduce((sum, tt) => sum + tt.available, 0);
    }, 0);
  }

}
