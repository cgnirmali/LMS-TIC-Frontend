import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSubjectComponent } from './group-subject.component';

describe('GroupSubjectComponent', () => {
  let component: GroupSubjectComponent;
  let fixture: ComponentFixture<GroupSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
