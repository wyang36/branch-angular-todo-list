import { TodoListService } from "./todo-list.service";
import { TodoService } from "./todos/todo.service";
import { TodoCompletedService } from "./todos/todo-completed.service";
import { DataStorageService } from "./data-storage.service";
import { Todo } from "./todos/todo.model";
import { TodoList } from "./todo-list.model";
import { Observable } from "rxjs";

describe('DataStorageService', () => {
    let httpClientSpy: {
        get: jasmine.Spy,
        post: jasmine.Spy,
        put: jasmine.Spy,
        delete: jasmine.Spy
    };
    let todoListServiceSpy: jasmine.SpyObj<TodoListService>;
    let todoServiceSpy: jasmine.SpyObj<TodoService>;
    let todoCompletedServiceSpy: jasmine.SpyObj<TodoCompletedService>;
    let dataService: DataStorageService;

    beforeEach(() => {
        // TODO: spy on other methods too
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        todoListServiceSpy = jasmine.createSpyObj('TodoListService', ['getActiveListById', 'getCompletedList']);
        todoServiceSpy = jasmine.createSpyObj('TodoService', ['getAllTodos']);
        todoCompletedServiceSpy = jasmine.createSpyObj('TodoCompletedService', ['getAllCompletedTodos']);
        dataService = new DataStorageService(<any>httpClientSpy, todoListServiceSpy, todoServiceSpy, todoCompletedServiceSpy);
    });

    it('getLists should call HttpClient get once', () => {
        httpClientSpy.get.and.returnValue(new Observable);

        dataService.getLists();
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('addList should call HttpClient post once', () => {
        httpClientSpy.post.and.returnValue(new Observable);
        const dummyTodos: Todo[] = [
            new Todo('0', 'To do 1', new Date(), 'some notes'),
            new Todo('1', 'To do 2', new Date(), 'some more notes'),
            new Todo('2', 'To do 3', new Date(), 'third note')
        ]

        const dummyList: TodoList = new TodoList('0', 'list 1', dummyTodos, false);

        dataService.addList(dummyList);
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });

    it('modifyActiveList should call HttpClient put once', () => {
        httpClientSpy.put.and.returnValue(new Observable);

        dataService.modifyActiveList();
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('modifyCompletedList should call HttpClient put once', () => {
        httpClientSpy.put.and.returnValue(new Observable);

        dataService.modifyCompletedList();
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('deleteList should call HttpClient delete once', () => {
        httpClientSpy.delete.and.returnValue(new Observable);

        dataService.deleteList('0');
        expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
    });
});