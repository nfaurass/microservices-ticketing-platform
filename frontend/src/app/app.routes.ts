import {Routes} from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {AuthComponent} from './pages/auth/auth.component';
import {EventsComponent} from './pages/events/events.component';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';
import {MyTicketsComponent} from './pages/my-tickets/my-tickets.component';
import {OrganizerDashboardComponent} from './pages/organizer-dashboard/organizer-dashboard.component';
import {EventFormComponent} from './pages/event-form/event-form.component';
import {SalesCheckinsComponent} from './pages/sales-checkins/sales-checkins.component';
import {CheckinScannerComponent} from './pages/checkin-scanner/checkin-scanner.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'events', component: EventsComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['attendee', 'organizer', 'venue']}
  },
  {
    path: 'events/:id', component: EventDetailComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['attendee', 'organizer', 'venue']}
  },
  {
    path: 'my-tickets', component: MyTicketsComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['attendee']}
  },
  {
    path: 'organizer-dashboard', component: OrganizerDashboardComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['organizer']}
  },
  {
    path: 'create-event', component: EventFormComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['organizer']}
  },
  {
    path: 'edit-event/:id', component: EventFormComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['organizer']}
  },
  {
    path: 'sales-checkins', component: SalesCheckinsComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['organizer']}
  },
  {
    path: 'checkin-scanner', component: CheckinScannerComponent,
    canActivate: [AuthGuard], data: {allowedRoles: ['venue']}
  },
];
