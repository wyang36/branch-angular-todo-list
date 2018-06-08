import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCompleteComponent } from './todo-complete.component';
import { TodoListService } from '../../todo-list.service';
import { DataStorageService } from '../../data-storage.service';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

describe('TodoCompleteComponent', () => {
    let component: TodoCompleteComponent;
    let fixture: ComponentFixture<TodoCompleteComponent>;

    let todolistServiceSpy: jasmine.SpyObj<TodoListService>;
    let todoServiceSpy: jasmine.SpyObj<TodoService>;
    let datastorageServiceSpy: jasmine.SpyObj<DataStorageService>;

    beforeEach(async(() => {
        const todolistservicespy = jasmine.createSpyObj('TodoListService', ['MoveTodoToCompleted']);
        const todoservicespy = jasmine.createSpyObj('TodoService', ['getActiveTodo']);
        const datastoragespy = jasmine.createSpyObj('DataStorageService', ['modifyActiveList', 'modifyCompletedList']);

        const dummyTodo: Todo = new Todo('0', 'fake title', new Date(), 'fake content');
        todoservicespy.getActiveTodo.and.returnValue(dummyTodo);

        TestBed.configureTestingModule({
            declarations: [
                TodoCompleteComponent
            ],
            providers: [
                { provide: TodoListService, useValue: todolistservicespy },
                { provide: DataStorageService, useValue: datastoragespy },
                { provide: TodoService, useValue: todoservicespy }
            ]
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

    it('should have fake title', () => {
        expect(component.todo.title).toBe('fake title');
    });
});
