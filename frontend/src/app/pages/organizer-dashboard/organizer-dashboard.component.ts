import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

interface EventSummary {
  id: string;
  title: string;
  date: string;
  ticketsSold: number;
  revenue: number;
  venue: string;
}

@Component({
  selector: 'app-organizer-dashboard',
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './organizer-dashboard.component.html',
  standalone: true,
  styleUrl: './organizer-dashboard.component.css'
})
export class OrganizerDashboardComponent implements OnInit {
  totalEvents = 3;
  totalTicketsSold = 1240;
  totalRevenue = 78500;

  recentEvents: EventSummary[] = [];

  ngOnInit() {
    this.recentEvents = [
      {
        id: '1',
        title: 'Tech Conference 2025',
        date: '2025-09-10',
        ticketsSold: 420,
        revenue: 22000,
        venue: 'Moscone Center, SF',
      },
      {
        id: '2',
        title: 'Startup Pitch Night',
        date: '2025-07-22',
        ticketsSold: 310,
        revenue: 15500,
        venue: 'NYC Expo Hall',
      },
      {
        id: '3',
        title: 'Summer Beats Festival',
        date: '2025-08-18',
        ticketsSold: 510,
        revenue: 41000,
        venue: 'Central Park, NYC',
      },
    ];
  }
}
