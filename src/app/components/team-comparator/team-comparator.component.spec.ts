import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComparatorComponent } from './team-comparator.component';

describe('TeamComparatorComponent', () => {
  let component: TeamComparatorComponent;
  let fixture: ComponentFixture<TeamComparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamComparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
