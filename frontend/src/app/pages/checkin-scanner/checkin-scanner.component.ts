import {Component} from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-checkin-scanner',
  imports: [
    ZXingScannerModule,
    CommonModule
  ],
  templateUrl: './checkin-scanner.component.html',
  standalone: true,
  styleUrl: './checkin-scanner.component.css'
})
export class CheckinScannerComponent {
  result: string | null = null;
  status: 'idle' | 'valid' | 'invalid' | 'used' = 'idle';

  scannedCodes: string[] = ['abc123', 'def456'];
  usedCodes: string[] = [];

  handleScan(qr: string) {
    this.result = qr;

    if (this.usedCodes.includes(qr)) {
      this.status = 'used';
    } else if (this.scannedCodes.includes(qr)) {
      this.status = 'valid';
      this.usedCodes.push(qr);
    } else {
      this.status = 'invalid';
    }
  }
}
