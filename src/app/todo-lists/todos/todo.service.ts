import { Todo } from "./todo.model";
import { Subject } from "rxjs";

export class TodoService {
    todos: Todo[] = [];

    searchField: string = '';

    updateTodos = new Subject<Todo[]>();
    updateAddStatus = new Subject<boolean>();
    updateEditStatus = new Subject<boolean>();
    updateDeleteStatus = new Subject<boolean>();
    updateCompleteStatus = new Subject<boolean>();

    isAddingTodo: boolean = false;
    isEditingTodo: boolean = false;
    isDeletingTodo: boolean = false;
    isCompletingTodo: boolean = false;
    activeTodoId: string;

    setTodos(todos: Todo[]) {
        this.todos = todos;
        this.updateTodos.next(this.getFilteredTodos());
    }

    getAllTodos() {
        return this.todos.slice();
    }

    getFilteredTodos() {
        const filteredTodos: Todo[] = [];
        this.todos.forEach((todo) => {
            if (todo.content.toUpperCase().includes(this.searchField.toUpperCase()) || todo.title.toUpperCase().includes(this.searchField.toUpperCase()))
                filteredTodos.push(todo);
        });

        filteredTodos.sort((a, b) => {
            if (a.dueDate > b.dueDate)
                return 1;
            else if (a.dueDate < b.dueDate)
                return -1;
            else
                return 0
        });

        return filteredTodos;
    }

    updateFilter(newFilter: string) {
        this.searchField = newFilter;
        this.updateTodos.next(this.getFilteredTodos());
    }

    getActiveTodo() {
        return this.todos.find((todo: Todo) => {
            return todo.id === this.activeTodoId;
        })
    }

    modifyAdd(addStatus: boolean) {
        this.isAddingTodo = addStatus;
        this.updateAddStatus.next(this.isAddingTodo);
    }

    modifyEdit(editStatus: boolean, id: string) {
        this.isEditingTodo = editStatus;
        this.activeTodoId = id;
        this.updateEditStatus.next(this.isEditingTodo);
    }

    modifyDelete(deleteStatus: boolean, id: string) {
        this.isDeletingTodo = deleteStatus;
        this.activeTodoId = id;
        this.updateDeleteStatus.next(this.isDeletingTodo);
    }

    modifyComplete(CompleteStatus: boolean, id: string) {
        this.isCompletingTodo = CompleteStatus;
        this.activeTodoId = id;
        this.updateCompleteStatus.next(this.isCompletingTodo);
    }

    updateTodo(todo: Todo) {
        for (let index = 0; index < this.todos.length; index++) {
            if (todo.id === this.todos[index].id)
                this.todos[index] = todo;
        }
        this.updateTodos.next(this.getFilteredTodos());
    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
        this.updateTodos.next(this.getFilteredTodos());
    }

    deleteTodo(id: string) {
        for (let index = 0; index < this.todos.length; index++) {
            if (id === this.todos[index].id)
                this.todos.splice(index, 1)
        }
        this.updateTodos.next(this.getFilteredTodos());
    }

}