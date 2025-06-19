import {Routes} from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {AuthComponent} from './pages/auth/auth.component';
import {EventsComponent} from './pages/events/events.component';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';
import {MyTicketsComponent} from './pages/my-tickets/my-tickets.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/:id', component: EventDetailComponent},
  {path: 'my-tickets', component: MyTicketsComponent},
];
