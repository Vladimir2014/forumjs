import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorForumComponent } from './error-forum.component';

describe('ErrorForumComponent', () => {
  let component: ErrorForumComponent;
  let fixture: ComponentFixture<ErrorForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
