import { TodoList } from "./todo-list.model";
import { Todo } from "./todos/todo.model";
import { Subject } from "rxjs";
import { TodoService } from "./todos/todo.service";
import { Injectable } from "@angular/core";

@Injectable()
export class TodoListService {
    constructor(private todoService: TodoService) { }

    private todoLists: TodoList[] = [];
    private completed: TodoList;

    updatedLists = new Subject<TodoList[]>();
    updateAddListStatus = new Subject<boolean>();
    updateCurrentListId = new Subject<string>();
    updateViewingCompletedStatus = new Subject<boolean>();

    isViewingCompleted: boolean = false;
    isAddingList: boolean = false;
    currentListId: string;

    setLists(todolists: TodoList[]) {
        const activeLists: TodoList[] = [];
        let completedList: TodoList;

        todolists.forEach((list: TodoList) => {
            if (list.isCompletedList)
                completedList = list;
            else
                activeLists.push(list);
        })
        this.todoLists = activeLists;
        this.completed = completedList;
        this.updatedLists.next(this.todoLists.slice());
    }

    addList(list: TodoList) {
        this.todoLists.push(list);
        this.ChooseCurrentList(list.id);
        this.updatedLists.next(this.todoLists.slice());
    }

    getActiveListById() {
        return this.todoLists.find((list: TodoList) => {
            return list.id === this.currentListId;
        })
    }

    setTodosOfCurrentList() {
        const todos = this.todoLists.find((list: TodoList) => {
            return list.id === this.currentListId;
        }).todos.map((todo: Todo) => {
            return {
                ...todo,
                id: todo['_id']
            }
        })
        this.todoService.setTodos(todos);
    }

    setTodosOfCompleted() {
        const todos = this.completed.todos;
        this.todoService.setTodos(todos);
    }

    getActiveLists() {
        return this.todoLists.slice();
    }

    getCompletedList() {
        return { ...this.completed };
    }

    getCompletedTodos() {
        return this.completed.todos.slice();
    }

    modifyAddListStatus(addStatus: boolean) {
        this.isAddingList = addStatus;
        this.updateAddListStatus.next(this.isAddingList);
    }

    modifyViewingCompletedStatus(isViewingCompleted: boolean) {
        this.isViewingCompleted = isViewingCompleted;
        this.updateViewingCompletedStatus.next(this.isViewingCompleted);
    }

    ChooseCurrentList(id: string) {
        this.currentListId = id;
        this.modifyViewingCompletedStatus(false);
        this.updateCurrentListId.next(id);
    }

    MoveTodoToCompleted(todo: Todo) {
        this.completed.todos.push(todo);
        this.todoService.deleteTodo(todo.id);
        this.updatedLists.next(this.todoLists.slice());

    }
}