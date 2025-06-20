import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../auth.service';

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
  };

  registerData = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {
  }

  onLogin() {
    console.log('Login Data:', this.loginData);
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (res) => console.log('Login Success:', res),
      error: (err) => console.error('Login Error:', err)
    });
  }

  onRegister() {
    console.log('Register Data:', this.registerData);
    this.authService.register(this.registerData.email, this.registerData.password, this.registerData.name).subscribe({
      next: (res) => console.log('Register Success:', res),
      error: (err) => console.error('Register Error:', err)
    });
  }
}
