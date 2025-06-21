import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './auth.component.html',
  standalone: true,
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  activeTab: 'login' | 'register' = 'login';

  loginData = {
    email: '',
    password: '',
    type: 'attendee'
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    type: 'attendee'
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin() {
    console.log('Login Data:', this.loginData);
    this.authService.login(this.loginData.email, this.loginData.password, this.loginData.type).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
        this.router.navigate(["/events"]);
      },
      error: (err) => console.error('Login Error:', err)
    });
  }

  onRegister() {
    console.log('Register Data:', this.registerData);
    this.authService.register(this.registerData.email, this.registerData.password, this.registerData.name, this.registerData.type).subscribe({
      next: (res) => {
        console.log('Register Success:', res);
        this.router.navigate(["/events"]);
      },
      error: (err) => console.error('Register Error:', err)
    });
  }
}
