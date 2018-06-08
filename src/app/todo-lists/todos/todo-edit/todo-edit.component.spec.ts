import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditComponent } from './todo-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../../data-storage.service';
import { SuiDatepickerModule } from 'ng2-semantic-ui';
import { Todo } from '../todo.model';

describe('TodoEditComponent', () => {
    let component: TodoEditComponent;
    let fixture: ComponentFixture<TodoEditComponent>;

    let todoServiceSpy: jasmine.SpyObj<TodoService>;
    let datastorageServiceSpy: jasmine.SpyObj<DataStorageService>;

    beforeEach(async(() => {
        const todoservicespy = jasmine.createSpyObj('TodoService',
            [
                'getActiveTodo',
                'updateTodo',
                'modifyAdd',
                'modifyEdit'
            ]);
        const datastoragespy = jasmine.createSpyObj('DataStorageService', ['modifyActiveList']);

        TestBed.configureTestingModule({
            declarations: [
                TodoEditComponent
            ],
            imports: [
                ReactiveFormsModule,
                SuiDatepickerModule
            ],
            providers: [
                { provide: TodoService, useValue: todoservicespy },
                { provide: DataStorageService, useValue: datastoragespy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('cant have all spaces in titles', () => {
        component.editForm.controls['title'].setValue('');
        expect(component.editForm.valid).toBeFalsy();
        component.editForm.controls['title'].setValue('    ');
        expect(component.editForm.valid).toBeFalsy();
    });

    it('must have a due date', () => {
        component.editForm.controls['dueDate'].setValue('');
        expect(component.editForm.valid).toBeFalsy();
    });

});
