import { TodoList } from "./todo-list.model";
import { Todo } from "./todos/todo.model";
import { Subject } from "rxjs";
import { TodoService } from "./todos/todo.service";
import { Injectable } from "@angular/core";
import { TodoCompletedService } from "./todos/todo-completed.service";

@Injectable()
export class TodoListService {
    constructor(private todoService: TodoService, private todoCompletedService: TodoCompletedService) { }

    private todoLists: TodoList[] = [];
    private completed: TodoList;

    updatedLists = new Subject<TodoList[]>();
    updateAddListStatus = new Subject<boolean>();
    updateCurrentListId = new Subject<string>();

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
        if (this.currentListId !== undefined)
            this.setTodosOfCurrentList();
        if (completedList)
            this.setTodosOfCompleted();
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

    checkIfListExist(id: string) {
        const index = this.todoLists.findIndex((list: TodoList) => {
            return list.id === id;
        });
        return (index >= 0);
    }

    setTodosOfCurrentList() {
        const currentlist = this.todoLists.find((list: TodoList) => {
            return list.id === this.currentListId;
        });
        if (currentlist) {
            const todos = currentlist.todos.map((todo: Todo) => {
                return {
                    ...todo,
                    id: todo['_id']
                }
            })
            this.todoService.setTodos(todos);
        }
    }

    setTodosOfCompleted() {
        if (this.completed) {
            const todos = this.completed.todos.map((todo: Todo) => {
                return {
                    ...todo,
                    id: todo['_id']
                }
            });
            this.todoCompletedService.setTodos(todos);
        }
    }

    getActiveLists() {
        return this.todoLists.slice();
    }

    getCompletedList() {
        return { ...this.completed };
    }

    modifyAddListStatus(addStatus: boolean) {
        this.isAddingList = addStatus;
        this.updateAddListStatus.next(this.isAddingList);
    }

    ChooseCurrentList(id: string) {
        this.currentListId = id;
        this.updateCurrentListId.next(id);
    }

    MoveTodoToCompleted(todo: Todo) {
        if (this.completed)
            this.completed.todos.push(todo);
        else
            this.completed = new TodoList(null, 'completed todos', [todo], true);
        this.setTodosOfCompleted();

        this.todoService.deleteTodo(todo.id);
        this.updatedLists.next(this.todoLists.slice());

    }
}