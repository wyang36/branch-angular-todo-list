import { Todo } from "./todos/todo.model";

export class TodoList {
    public id: string;
    public title: string;
    public isCompletedList: boolean;
    public todos: Todo[];

    constructor(id: string, title: string, todos: Todo[], isCompletedList: boolean) {
        this.id = id;
        this.title = title;
        this.todos = todos;
        this.isCompletedList = isCompletedList;
    }
}