import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDeleteComponent } from './todo-delete.component';
import { DataStorageService } from '../../data-storage.service';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

describe('TodoDeleteComponent', () => {
    let component: TodoDeleteComponent;
    let fixture: ComponentFixture<TodoDeleteComponent>;

    let todoServiceSpy: jasmine.SpyObj<TodoService>;
    let datastorageServiceSpy: jasmine.SpyObj<DataStorageService>;

    beforeEach(async(() => {
        const todoservicespy = jasmine.createSpyObj('TodoService', ['getActiveTodo', 'deleteTodo']);
        const datastoragespy = jasmine.createSpyObj('DataStorageService', ['modifyActiveList', 'modifyDelete']);

        const dummyTodo: Todo = new Todo('0', 'fake title', new Date(), 'fake content');
        todoservicespy.getActiveTodo.and.returnValue(dummyTodo);

        TestBed.configureTestingModule({
            declarations: [
                TodoDeleteComponent
            ],
            providers: [
                { provide: DataStorageService, useValue: datastoragespy },
                { provide: TodoService, useValue: todoservicespy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoDeleteComponent);
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
