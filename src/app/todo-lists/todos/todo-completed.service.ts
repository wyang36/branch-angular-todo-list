import { Todo } from "./todo.model";
import { Subject } from "rxjs";

export class TodoCompletedService {
    todos: Todo[] = [];

    searchField: string = '';

    updateCompletedTodos = new Subject<Todo[]>();
    
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

    getAllCompletedTodos() {
        return this.todos.slice();
    }

    setTodos(todos: Todo[]) {
        this.todos = todos;
        this.updateCompletedTodos.next(this.getFilteredTodos());
    }

    updateFilter(newFilter: string) {
        this.searchField = newFilter;
        this.updateCompletedTodos.next(this.getFilteredTodos());
    }
    
}