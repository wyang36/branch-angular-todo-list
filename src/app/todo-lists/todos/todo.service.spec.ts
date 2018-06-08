import { TodoService } from "./todo.service";
import { Todo } from "./todo.model";

describe('TodoCompletedService', () => {
    let service: TodoService;
    const dummyTodos: Todo[] = [
        new Todo('0', 'To do 1', new Date(), 'some notes'),
        new Todo('1', 'To do 2', new Date(), 'some more notes'),
        new Todo('2', 'To do 3', new Date(), 'third note')
    ]
    beforeEach(() => {
        service = new TodoService();
        service.setTodos(dummyTodos);
    });

    it('getAllTodos should return all set todos', () => {
        expect(service.getAllTodos()).toEqual(dummyTodos);
    });

    it('modifyAdd should modify isAddingTodo', () => {
        service.modifyAdd(true);
        expect(service.isAddingTodo).toBeTruthy;
        service.modifyAdd(false);
        expect(service.isAddingTodo).toBeFalsy;
    });

    it('modifyEdit should modify isEditingTodo', () => {
        service.modifyEdit(true, '0');
        expect(service.isEditingTodo).toBeTruthy;
        expect(service.getActiveTodo()).toBe(dummyTodos[0]);
        service.modifyEdit(false, '1');
        expect(service.isEditingTodo).toBeFalsy;
        expect(service.getActiveTodo()).toBe(dummyTodos[1]);
    });

    it('modifyDelete should modify isDeletingTodo', () => {
        service.modifyDelete(true, '0');
        expect(service.isDeletingTodo).toBeTruthy;
        expect(service.getActiveTodo()).toBe(dummyTodos[0]);
        service.modifyDelete(false, '1');
        expect(service.isDeletingTodo).toBeFalsy;
        expect(service.getActiveTodo()).toBe(dummyTodos[1]);
    });

    it('modifyComplete should modify isCompletingTodo', () => {
        service.modifyComplete(true, '0');
        expect(service.isCompletingTodo).toBeTruthy;
        expect(service.getActiveTodo()).toBe(dummyTodos[0]);
        service.modifyComplete(false, '1');
        expect(service.isCompletingTodo).toBeFalsy;
        expect(service.getActiveTodo()).toBe(dummyTodos[1]);
    });

    it('updateTodo should update the specified todo', () => {
        const newTodo = new Todo('2', 'updated title', new Date(), '');
        service.updateTodo(newTodo);
        expect(service.todos[2]).toBe(newTodo);
    });

    it('addTodo should add a todo', () => {
        const newTodo = new Todo('5', 'new title', new Date(), '');
        service.addTodo(newTodo);
        expect(service.todos[3]).toBe(newTodo);
    });

    it('deleteTodo should delete a specified todo', () => {
        service.deleteTodo('0');
        expect(service.todos[0].title).toBe('To do 2');
    });
});