import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketService} from '../../tickets.service';

interface Event {
  _id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchasedTicket {
  _id: string;
  userId: string;
  eventId: Event;
  ticketType: string;
  price: number;
  qrCode: string;
  status: 'active' | 'scanned' | 'cancelled';
  checkInTime: string | null;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-my-tickets',
  imports: [
    CommonModule
  ],
  templateUrl: './my-tickets.component.html',
  standalone: true,
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent {
  tickets: PurchasedTicket[] | null = null;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.ticketService.getMyTickets().subscribe({
      next: (data) => {
        this.tickets = data.map(t => {
          t.qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + t.qrCode;
          return t;
        });
      },
      error: (err) => {
        console.error('Error loading events', err);
      }
    });
  }

}
