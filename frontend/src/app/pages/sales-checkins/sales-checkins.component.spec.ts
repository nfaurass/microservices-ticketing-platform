import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCheckinsComponent } from './sales-checkins.component';

describe('SalesCheckinsComponent', () => {
  let component: SalesCheckinsComponent;
  let fixture: ComponentFixture<SalesCheckinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCheckinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCheckinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
