import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinScannerComponent } from './checkin-scanner.component';

describe('CheckinScannerComponent', () => {
  let component: CheckinScannerComponent;
  let fixture: ComponentFixture<CheckinScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckinScannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
