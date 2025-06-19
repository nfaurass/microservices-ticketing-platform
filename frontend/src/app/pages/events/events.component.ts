import {Component} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  priceFrom: number;
  ticketsAvailable: number;
}

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
  events: Event[] = [
    {
      id: '1',
      title: 'Summer Music Festival 2025',
      date: '2025-07-15',
      venue: 'Central Park, NYC',
      description: 'Experience the best live bands and DJs all day long.',
      imageUrl: 'https://cdnv2.guichet.com/public/sliders/E1vqsobzbHl570tCKYhH5GfEzGHqz9V0k63wNda8.png',
      priceFrom: 45,
      ticketsAvailable: 120,
    },
    {
      id: '2',
      title: 'Tech Innovators Conference',
      date: '2025-09-10',
      venue: 'San Francisco Convention Center',
      description: 'Discover groundbreaking tech and network with innovators.',
      imageUrl: 'https://cdnv2.guichet.com/public/sliders/exyJisLjGXB29QUtnah5wTvHBz5jfjp75bsqUy83.jpg',
      priceFrom: 150,
      ticketsAvailable: 35,
    },
    {
      id: '3',
      title: 'Culinary Arts Workshop',
      date: '2025-08-22',
      venue: 'Downtown Cooking Studio',
      description: 'Hands-on cooking with world-renowned chefs.',
      imageUrl: 'https://cdnv2.guichet.com/public/sliders/zPSGnvVL0BXUctraeRIhkFnZ6eAdWhKDHYzM69EI.jpg',
      priceFrom: 90,
      ticketsAvailable: 15,
    },
  ];

  onSelectEvent(event: Event) {
    alert(`Selected event: ${event.title}`);
  }
}
