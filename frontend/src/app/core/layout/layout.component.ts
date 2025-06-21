import {Component, OnInit} from '@angular/core';
import {AuthService, UserProfile} from '../../auth.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-layout',
  template: `
    <nav *ngIf="user" class="bg-gray-900 text-white shadow-md">
      <div class="container mx-auto px-6 py-4 grid grid-cols-3 items-center">
        <div class="flex items-center space-x-3">
          <span class="text-lg font-semibold">Welcome, {{ user.name }}!</span>
        </div>
        <div class="flex justify-center space-x-6 text-base font-medium">
          <a routerLink="/" class="hover:text-gray-300 transition">Home</a>
          <a routerLink="/events" class="hover:text-gray-300 transition">Events</a>
          <a *ngIf="user.type == 'attendee'" routerLink="/my-tickets" class="hover:text-gray-300 transition">
            My Tickets
          </a>
          <a *ngIf="user.type == 'organizer'" routerLink="/organizer-dashboard" class="hover:text-gray-300 transition">
            Dashboard
          </a>
          <a *ngIf="user.type == 'organizer'" routerLink="/sales-checkins" class="hover:text-gray-300 transition">
            Sales Checkins
          </a>
          <a *ngIf="user.type == 'venue'" routerLink="/checkin-scanner" class="hover:text-gray-300 transition">
            Checkin Scanner
          </a>
        </div>
        <div class="flex justify-end">
          <button (click)="logout()"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ]
})
export class LayoutComponent implements OnInit {
  user: UserProfile | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.profile().subscribe(profile => {
      if (!profile) this.router.navigate(['/auth']);
      this.user = profile;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth"]);
  }
}
