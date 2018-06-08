import { TodoListService } from "./todo-list.service";
import { TodoService } from "./todos/todo.service";
import { TodoCompletedService } from "./todos/todo-completed.service";
import { DataStorageService } from "./data-storage.service";
import { Todo } from "./todos/todo.model";
import { TodoList } from "./todo-list.model";

describe('DataStorageService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let todoListServiceSpy: jasmine.SpyObj<TodoListService>;
    let todoServiceSpy: jasmine.SpyObj<TodoService>;
    let todoCompletedServiceSpy: jasmine.SpyObj<TodoCompletedService>;
    let dataService: DataStorageService;

    beforeEach(() => {
        // TODO: spy on other methods too
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        dataService = new DataStorageService(<any>httpClientSpy, todoListServiceSpy, todoServiceSpy, todoCompletedServiceSpy);
    });

    // it('should return expected heroes (HttpClient called once)', () => {
    //     const dummyTodos: Todo[] = [
    //         new Todo('0', 'To do 1', new Date(), 'some notes'),
    //         new Todo('1', 'To do 2', new Date(), 'some more notes'),
    //         new Todo('2', 'To do 3', new Date(), 'third note')
    //     ]
    
    //     const dummyLists: TodoList[] = [
    //         new TodoList('0', 'list 1', [], false),
    //         new TodoList('1', 'list 2', dummyTodos, false)
    //     ]

    //     httpClientSpy.get.and.returnValue(dummyLists);

    //     dataService.getLists();
    //     expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    // });

    // it('should return an error when the server returns a 404', () => {
    //     const errorResponse = new HttpErrorResponse({
    //         error: 'test 404 error',
    //         status: 404, statusText: 'Not Found'
    //     });

    //     httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    //     heroService.getHeroes().subscribe(
    //         heroes => fail('expected an error, not heroes'),
    //         error => expect(error.message).toContain('test 404 error')
    //     );
    // });
});