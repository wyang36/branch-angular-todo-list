import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListAddComponent } from './todo-list-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { DataStorageService } from '../data-storage.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
    let component: TodoListAddComponent;
    let fixture: ComponentFixture<TodoListAddComponent>;

    let todolistServiceSpy: jasmine.SpyObj<TodoListService>;
    let datastorageServiceSpy: jasmine.SpyObj<DataStorageService>;

    beforeEach(async(() => {
        const todolistservicespy = jasmine.createSpyObj('TodoListService', ['setTodos']);
        const datastoragespy = jasmine.createSpyObj('DataStorageService', ['setTodos']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

        TestBed.configureTestingModule({
            declarations: [
                TodoListAddComponent
            ],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                TodoListService,
                { provide: TodoListService, useValue: todolistservicespy },
                { provide: DataStorageService, useValue: datastoragespy },
                { provide: Router, useValue: routerSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('cant have all spaces in titles', () => {
        component.addListForm.controls['title'].setValue('');
        expect(component.addListForm.valid).toBeFalsy();
        component.addListForm.controls['title'].setValue('    ');
        expect(component.addListForm.valid).toBeFalsy();
    });
});
