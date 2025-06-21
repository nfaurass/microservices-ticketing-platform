import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, JsonPipe} from '@angular/common';
import {EventsService, Event} from '../../events.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../tickets.service';

@Component({
  selector: 'app-event-detail',
  imports: [
    CommonModule,
    DatePipe,
    JsonPipe
  ],
  templateUrl: './event-detail.component.html',
  standalone: true,
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  selectedTicketId: string | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private router: Router,
    private ticketsService: TicketService
  ) {
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventsService.getEvent(eventId).subscribe({
        next: (data) => {
          this.event = data;
          if (this.event.ticketTypes.length > 0 && this.event.ticketTypes[0].ticketTypes.length > 0) {
            this.selectedTicketId = this.event.ticketTypes[0].ticketTypes[0]._id || null;
          }
        },
        error: (err) => {
          console.error('Error loading event', err);
          this.router.navigate(['/events']);
        },
      });
    } else {
      console.error('No event ID in route');
      this.router.navigate(['/events']);
    }
  }

  onSelectTicket(ticketId: string) {
    this.selectedTicketId = ticketId;
  }

  get totalPrice(): number {
    if (!this.event || !this.selectedTicketId) return 0;
    for (const ticketGroup of this.event.ticketTypes) {
      const ticket = ticketGroup.ticketTypes.find(t => t._id === this.selectedTicketId);
      if (ticket) return ticket.price * this.quantity;
    }
    return 0;
  }

  incrementQuantity() {
    if (!this.event || !this.selectedTicketId) return;
    for (const ticketGroup of this.event.ticketTypes) {
      const ticket = ticketGroup.ticketTypes.find(t => t._id === this.selectedTicketId);
      if (ticket && this.quantity < ticket.available) {
        this.quantity++;
        return;
      }
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  onPurchase() {
    if (!this.selectedTicketId || !this.event) return;
    for (const ticketGroup of this.event.ticketTypes) {
      const ticket = ticketGroup.ticketTypes.find(t => t._id === this.selectedTicketId);
      if (ticket) {
        this.ticketsService.purchaseTicket(this.event._id, ticket._id!, this.quantity.toString()).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/my-tickets']);
          },
          error: (err) => {
            console.error('Error purchasing event ticket', err);
          },
        });
        return;
      }
    }
  }
}
