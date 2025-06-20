import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, JsonPipe, NgOptimizedImage} from '@angular/common';

interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  description?: string;
}

interface EventDetail {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  ticketTypes: TicketType[];
}

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
  event: EventDetail | null = null;
  selectedTicketId: string | null = null;
  quantity: number = 1;

  ngOnInit() {
    this.event = {
      id: '1',
      title: 'Summer Music Festival 2025',
      date: '2025-07-15',
      venue: 'Central Park, NYC',
      description: `Join us for an unforgettable day of live music, food trucks, and fun activities! Featuring top artists and DJs across multiple stages.`,
      imageUrl: 'https://cdnv2.guichet.com/public/sliders/exyJisLjGXB29QUtnah5wTvHBz5jfjp75bsqUy83.jpg',
      ticketTypes: [
        {
          id: 'general',
          name: 'General Admission',
          price: 50,
          available: 150,
          description: 'Access to all general areas and stages.',
        },
        {
          id: 'vip',
          name: 'VIP Pass',
          price: 120,
          available: 40,
          description:
            'Includes backstage access, premium seating, and complimentary drinks.',
        },
      ],
    };

    if (this.event.ticketTypes.length) {
      this.selectedTicketId = this.event.ticketTypes[0].id;
    }
  }

  onSelectTicket(ticketId: string) {
    this.selectedTicketId = ticketId;
  }

  get totalPrice(): number {
    const ticket = this.event?.ticketTypes.find(t => t.id === this.selectedTicketId);
    return ticket ? ticket.price * this.quantity : 0;
  }

  incrementQuantity() {
    if (!this.event) return;
    const ticket = this.event.ticketTypes.find(t => t.id === this.selectedTicketId);
    if (ticket && this.quantity < ticket.available) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  onPurchase() {
    if (!this.selectedTicketId || !this.event) return;

    const ticket = this.event.ticketTypes.find(t => t.id === this.selectedTicketId);
    if (!ticket) return;

    alert(
      `Purchasing ${this.quantity} x ${ticket.name} ticket(s) for ${this.event.title} at $${ticket.price} each. Total: $${(
        ticket.price * this.quantity
      ).toFixed(2)}`
    );
  }
}
