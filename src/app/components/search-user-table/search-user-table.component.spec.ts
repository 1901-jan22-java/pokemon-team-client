import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserTableComponent } from './search-user-table.component';

describe('SearchUserTableComponent', () => {
  let component: SearchUserTableComponent;
  let fixture: ComponentFixture<SearchUserTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUserTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
