import { Todo } from "./todo.model";
import { Subject } from "rxjs";

export class TodoCompletedService {
    todos: Todo[] = [];
    searchField: string = '';
    updateCompletedFilteredTodos = new Subject<Todo[]>();
    updateSuggestedTitles = new Subject<string[]>();
    suggestTitle: string[] = [];

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
        this.suggestTitle = [];
        todos.forEach((todo: Todo) => {
            this.suggestTitle.push(todo.title);
        })
        this.updateSuggestedTitles.next(this.suggestTitle.slice());
        this.updateCompletedFilteredTodos.next(this.getFilteredTodos());
    }

    updateFilter(newFilter: string) {
        this.searchField = newFilter;
        this.updateCompletedFilteredTodos.next(this.getFilteredTodos());
    }

}