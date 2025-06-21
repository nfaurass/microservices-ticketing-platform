import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {PurchasedTicket} from './pages/my-tickets/my-tickets.component';

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

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly API_URL = 'http://localhost:3001/api/tickets';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  purchaseTicket(eventId: string, ticketType: string, quantity: string): Observable<any> {
    return this.httpClient.post(this.API_URL + `/purchase/${eventId}`, {ticketType, quantity});
  }

  getMyTickets(): Observable<PurchasedTicket[]> {
    return this.httpClient.get<PurchasedTicket[]>(this.API_URL + `/get`, {
      headers: {Authorization: `Bearer ${this.authService.getAccessToken()}`}
    });
  }

}
