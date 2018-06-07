import { TodoListService } from "./todo-list.service";
import { TodoService } from "./todos/todo.service";
import { TodoCompletedService } from "./todos/todo-completed.service";
import { TestBed } from "@angular/core/testing";
import { Todo } from "./todos/todo.model";
import { TodoList } from "./todo-list.model";

describe('TodoListService', () => {
    let todoListService: TodoListService;
    let todoServiceSpy: jasmine.SpyObj<TodoService>;
    let todoCompletedServiceSpy: jasmine.SpyObj<TodoCompletedService>;

    const dummyTodos: Todo[] = [
        new Todo('0', 'To do 1', new Date(), 'some notes'),
        new Todo('1', 'To do 2', new Date(), 'some more notes'),
        new Todo('2', 'To do 3', new Date(), 'third note')
    ]

    const dummyLists: TodoList[] = [
        new TodoList('0', 'list 1', [], false),
        new TodoList('1', 'list 2', dummyTodos, false)
    ]

    beforeEach(() => {
        const todospy = jasmine.createSpyObj('TodoService', ['setTodos']);
        const todocompletedspy = jasmine.createSpyObj('TodoCompletedService', ['setTodos']);

        TestBed.configureTestingModule({
            // Provide both the service-to-test and its (spy) dependency
            providers: [
                TodoListService,
                { provide: TodoService, useValue: todospy },
                { provide: TodoCompletedService, useValue: todocompletedspy }
            ]
        });
        // Inject both the service-to-test and its (spy) dependency
        todoListService = TestBed.get(TodoListService);
        todoServiceSpy = TestBed.get(TodoService);
        todoCompletedServiceSpy = TestBed.get(TodoCompletedService);

        todoListService.setLists(dummyLists);
    });

    it('#addList should add a list', () => {
        const newList = new TodoList('5', 'new title', [], false);
        todoListService.addList(newList);
        expect(todoListService.getActiveLists().length).toBe(3);
    });

    it('#getActiveListById should return the specified list', () => {
        todoListService.ChooseCurrentList('0');
        expect(todoListService.getActiveListById()).toBe(dummyLists[0]);
    });

    it('#checkIfListExist should return boolean on if a list exist', () => {
        expect(todoListService.checkIfListExist('5')).toBeFalsy;
        expect(todoListService.checkIfListExist('0')).toBeTruthy;
    });

    it('#modifyAddListStatus should modify isAddingList', () => {
        todoListService.modifyAddListStatus(true);
        expect(todoListService.isAddingList).toBeTruthy;
        todoListService.modifyAddListStatus(false);
        expect(todoListService.isAddingList).toBeFalsy;
    });
    
    it('#modifyDeleteListStatus should modify isDeletingList', () => {
        todoListService.modifyDeleteListStatus(true);
        expect(todoListService.isDeletingList).toBeTruthy;
        todoListService.modifyDeleteListStatus(false);
        expect(todoListService.isDeletingList).toBeFalsy;
    });
});