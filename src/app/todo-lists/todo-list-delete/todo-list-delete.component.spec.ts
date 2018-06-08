import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDeleteComponent } from './todo-list-delete.component';
import { TodoListService } from '../todo-list.service';
import { DataStorageService } from '../data-storage.service';
import { Router } from '@angular/router';
import { TodoList } from '../todo-list.model';

describe('TodoListDeleteComponent', () => {
    let component: TodoListDeleteComponent;
    let fixture: ComponentFixture<TodoListDeleteComponent>;

    let todolistServiceSpy: jasmine.SpyObj<TodoListService>;
    let datastorageServiceSpy: jasmine.SpyObj<DataStorageService>;

    beforeEach(async(() => {
        const todolistservicespy = jasmine.createSpyObj('TodoListService', ['getActiveListById']);
        const datastoragespy = jasmine.createSpyObj('DataStorageService', ['deleteList']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        const dummyList: TodoList = new TodoList('0', 'fake title', [], false);
        todolistservicespy.getActiveListById.and.returnValue(dummyList);

        TestBed.configureTestingModule({
            declarations: [
                TodoListDeleteComponent
            ],
            providers: [
                { provide: TodoListService, useValue: todolistservicespy },
                { provide: DataStorageService, useValue: datastoragespy },
                { provide: Router, useValue: routerSpy }
            ]
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

    it('should have fake title', () => {
        expect(component.list.title).toBe('fake title');
    });
});
