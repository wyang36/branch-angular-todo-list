import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCompleteComponent } from './todo-complete.component';

describe('TodoCompleteComponent', () => {
  let component: TodoCompleteComponent;
  let fixture: ComponentFixture<TodoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
