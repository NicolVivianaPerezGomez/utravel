import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrecQuestions } from './frec-questions';

describe('FrecQuestions', () => {
  let component: FrecQuestions;
  let fixture: ComponentFixture<FrecQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrecQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrecQuestions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
