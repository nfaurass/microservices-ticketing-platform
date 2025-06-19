import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

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

  onLogin() {
    console.log('Login Data:', this.loginData);
    alert('Login submitted. Check console.');
  }

  onRegister() {
    console.log('Register Data:', this.registerData);
    alert('Register submitted. Check console.');
  }
}
