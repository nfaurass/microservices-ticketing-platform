import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface TicketType {
  _id?: string;
  name: string;
  price: number;
  available: number;
  description?: string;
}

export interface Ticket {
  _id: string;
  eventId: string;
  ticketTypes: TicketType[];
}

export interface Event {
  _id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  ticketTypes: Ticket[];
}

interface EventCreationTicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  description?: string;
}

export interface EventCreationEventAttrs {
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  ticketTypes: TicketType[];
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly API_URL = 'http://localhost:3002/api/events';

  constructor(private httpClient: HttpClient) {
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.API_URL + "/get");
  }

  getEvent(eventId: string): Observable<Event> {
    return this.httpClient.get<Event>(this.API_URL + "/get/" + eventId);
  }

  createEvent(event: EventCreationEventAttrs): Observable<Event> {
    console.log(JSON.stringify(event));
    return this.httpClient.post<Event>(this.API_URL + "/create", event);
  }
}
