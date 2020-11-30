import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForumsComponent } from './list-forums.component';

describe('ListForumsComponent', () => {
  let component: ListForumsComponent;
  let fixture: ComponentFixture<ListForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListForumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
