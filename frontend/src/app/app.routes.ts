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
import {LayoutComponent} from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'events',
        component: EventsComponent,
        data: {allowedRoles: ['attendee', 'organizer', 'venue']}
      },
      {
        path: 'events/:id',
        component: EventDetailComponent,
        data: {allowedRoles: ['attendee', 'organizer', 'venue']}
      },
      {
        path: 'my-tickets',
        component: MyTicketsComponent,
        data: {allowedRoles: ['attendee']}
      },
      {
        path: 'organizer-dashboard',
        component: OrganizerDashboardComponent,
        data: {allowedRoles: ['organizer']}
      },
      {
        path: 'create-event',
        component: EventFormComponent,
        data: {allowedRoles: ['organizer']}
      },
      {
        path: 'edit-event/:id',
        component: EventFormComponent,
        data: {allowedRoles: ['organizer']}
      },
      {
        path: 'sales-checkins',
        component: SalesCheckinsComponent,
        data: {allowedRoles: ['organizer']}
      },
      {
        path: 'checkin-scanner',
        component: CheckinScannerComponent,
        data: {allowedRoles: ['venue']}
      },
    ]
  }
];
