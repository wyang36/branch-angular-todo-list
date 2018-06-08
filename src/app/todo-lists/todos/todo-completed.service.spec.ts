import { TodoCompletedService } from "./todo-completed.service";
import { Todo } from "./todo.model";

describe('TodoCompletedService', () => {
    let service: TodoCompletedService;
    const dummyTodos: Todo[] = [
        new Todo('0', 'To do 1', new Date(), 'some notes'),
        new Todo('1', 'To do 2', new Date(), 'some more notes')
    ]
    beforeEach(() => {
        service = new TodoCompletedService();
        service.setTodos(dummyTodos);
    });

    it('getAllCompletedTodos should return all set todos', () => {
        expect(service.getAllCompletedTodos()).toEqual(dummyTodos);
    });

    it('getFilteredTodos should return filtered todos', () => {
        service.updateFilter('1');
        expect(service.getFilteredTodos()).toEqual([dummyTodos[0]]);
        service.updateFilter('more');
        expect(service.getFilteredTodos()).toEqual([dummyTodos[1]]);
    });
});