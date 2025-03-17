import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentSubmissionComponent } from './assesment-submission.component';

describe('AssesmentSubmissionComponent', () => {
  let component: AssesmentSubmissionComponent;
  let fixture: ComponentFixture<AssesmentSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssesmentSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssesmentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
