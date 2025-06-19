import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

interface EventMetrics {
  title: string;
  totalTickets: number;
  ticketsSold: number;
  checkedIn: number;
}

@Component({
  selector: 'app-sales-checkins',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sales-checkins.component.html',
  standalone: true,
  styleUrl: './sales-checkins.component.css'
})
export class SalesCheckinsComponent implements OnInit {

  events: EventMetrics[] = [
    {
      title: 'Tech Conference 2025',
      totalTickets: 400,
      ticketsSold: 320,
      checkedIn: 190,
    },
    {
      title: 'Startup Meetup 2025',
      totalTickets: 150,
      ticketsSold: 120,
      checkedIn: 60,
    },
  ];

  selectedEventIndex = 0;

  get currentEvent() {
    return this.events[this.selectedEventIndex];
  }

  ngOnInit() {

  }


}
