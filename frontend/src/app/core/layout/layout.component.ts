import {Component, OnInit} from '@angular/core';
import {AuthService, UserProfile} from '../../auth.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-layout',
  template: `
    <nav class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex items-center justify-between px-4">
        <a routerLink="/" class="text-xl font-bold hover:text-gray-300">
          MyApp
        </a>
        <div *ngIf="user" class="flex items-center space-x-4">
          <span>Welcome, {{ user.name }}!</span>
          <button
            (click)="logout()"
            class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <main class="container mx-auto px-4 py-6">
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
