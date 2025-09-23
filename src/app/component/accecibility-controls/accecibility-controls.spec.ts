import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccecibilityControls } from './accecibility-controls';

describe('AccecibilityControls', () => {
  let component: AccecibilityControls;
  let fixture: ComponentFixture<AccecibilityControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccecibilityControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccecibilityControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
