import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ZXingScannerModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
