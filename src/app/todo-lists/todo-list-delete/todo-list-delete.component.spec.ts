import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDeleteComponent } from './todo-list-delete.component';

describe('TodoListDeleteComponent', () => {
  let component: TodoListDeleteComponent;
  let fixture: ComponentFixture<TodoListDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
