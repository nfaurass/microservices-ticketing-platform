import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

interface Ticket {
  id: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  ticketType: string;
  purchaseDate: string;
  qrCodeUrl: string;
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
  tickets: Ticket[] = [];

  ngOnInit() {
    this.tickets = [
      {
        id: 'tk1',
        eventTitle: 'Summer Music Festival 2025',
        eventDate: '2025-07-15',
        venue: 'Central Park, NYC',
        ticketType: 'VIP Pass',
        purchaseDate: '2025-05-01',
        qrCodeUrl:
          'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=myticket1',
      },
      {
        id: 'tk2',
        eventTitle: 'Tech Conference 2025',
        eventDate: '2025-09-10',
        venue: 'Moscone Center, San Francisco',
        ticketType: 'General Admission',
        purchaseDate: '2025-05-12',
        qrCodeUrl:
          'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=myticket2',
      },
    ];
  }

}
