import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { TodoList } from "./todo-list.model";
import { Todo } from ".//todos/todo.model";
import { TodoListService } from "./todo-list.service";
import { TodoService } from "./todos/todo.service";
import { TodoCompletedService } from "./todos/todo-completed.service";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private todoListService: TodoListService, private todoSerivice: TodoService, private todoCompletedService: TodoCompletedService) { }

    getLists() {
        this.http.get('https://damp-sea-61125.herokuapp.com/api/todolists')
            .pipe(map((todolists: TodoList[]) => {
                return todolists.map((todolist) => {
                    if (!todolist.todos)
                        todolist.todos = [];
                    return {
                        ...todolist,
                        id: todolist['_id'],
                        todos: todolist.todos.map((todo: Todo) => {
                            return {
                                ...todo,
                                id: todo['-id'],
                                dueDate: new Date(todo.dueDate)
                            }

                        })
                    };
                })
            }))
            .subscribe(
                (todolists: TodoList[]) => {
                    this.todoListService.setLists(todolists);
                }
            )
    }

    addList(list: TodoList) {
        return this.http.post('https://damp-sea-61125.herokuapp.com/api/todolist', list)
            .pipe(map((todolist: TodoList) => {
                if (!todolist.todos)
                    todolist.todos = [];
                return {
                    ...todolist,
                    id: todolist['_id'],
                    todos: todolist.todos.map((todo: Todo) => {
                        return {
                            ...todo,
                            id: todo['-id'],
                            dueDate: new Date(todo.dueDate)
                        }

                    })
                }
            }));
    }

    modifyActiveList() {
        const oldList = this.todoListService.getActiveListById();
        const updatedTodos = this.todoSerivice.getAllTodos();
        const newList = {
            ...oldList,
            todos: updatedTodos
        }
        this.http.put('https://damp-sea-61125.herokuapp.com/api/todolist', newList)
            .pipe(map((todolists: TodoList[]) => {
                return todolists.map((todolist) => {
                    if (!todolist.todos)
                        todolist.todos = [];
                    return {
                        ...todolist,
                        id: todolist['_id'],
                        todos: todolist.todos.map((todo: Todo) => {
                            return {
                                ...todo,
                                id: todo['-id'],
                                dueDate: new Date(todo.dueDate)
                            }

                        })
                    };
                })
            }))
            .subscribe(
                (todolists: TodoList[]) => {
                    this.todoListService.setLists(todolists);
                }
            )
    }

    modifyCompletedList() {
        const oldList = this.todoListService.getCompletedList();
        const updatedTodos = this.todoCompletedService.getAllCompletedTodos();
        const newList = {
            ...oldList,
            todos: updatedTodos
        }
        this.http.put('https://damp-sea-61125.herokuapp.com/api/todolist', newList)
            .pipe(map((todolists: TodoList[]) => {
                return todolists.map((todolist) => {
                    if (!todolist.todos)
                        todolist.todos = [];
                    return {
                        ...todolist,
                        id: todolist['_id'],
                        todos: todolist.todos.map((todo: Todo) => {
                            return {
                                ...todo,
                                id: todo['-id'],
                                dueDate: new Date(todo.dueDate)
                            }

                        })
                    };
                })
            }))
            .subscribe(
                (todolists: TodoList[]) => {
                    this.todoListService.setLists(todolists);
                }
            )
    }

    deleteList(id: string) {
        this.http.delete('https://damp-sea-61125.herokuapp.com/api/todolist/' + id)
            .pipe(map((todolists: TodoList[]) => {
                return todolists.map((todolist) => {
                    return {
                        ...todolist,
                        id: todolist['_id'],
                        todos: todolist.todos.map((todo: Todo) => {
                            return {
                                ...todo,
                                id: todo['-id'],
                                dueDate: new Date(todo.dueDate)
                            }

                        })
                    };
                })
            }))
            .subscribe(
                (todolists: TodoList[]) => {
                    this.todoListService.setLists(todolists);
                }
            )
    }
}