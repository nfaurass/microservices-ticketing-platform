import {Routes} from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {AuthComponent} from './pages/auth/auth.component';
import {EventsComponent} from './pages/events/events.component';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';
import {MyTicketsComponent} from './pages/my-tickets/my-tickets.component';
import {OrganizerDashboardComponent} from './pages/organizer-dashboard/organizer-dashboard.component';
import {EventFormComponent} from './pages/event-form/event-form.component';
import {SalesCheckinsComponent} from './pages/sales-checkins/sales-checkins.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/:id', component: EventDetailComponent},
  {path: 'my-tickets', component: MyTicketsComponent},
  {path: 'organizer-dashboard', component: OrganizerDashboardComponent},
  {path: 'create-event', component: EventFormComponent},
  {path: 'edit-event/:id', component: EventFormComponent},
  {path: 'sales-checkins', component: SalesCheckinsComponent},
];
