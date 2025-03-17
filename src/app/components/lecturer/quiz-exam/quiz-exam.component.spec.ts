import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizExamComponent } from './quiz-exam.component';

describe('QuizExamComponent', () => {
  let component: QuizExamComponent;
  let fixture: ComponentFixture<QuizExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
