import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { TodoList } from "./todo-list.model";
import { Todo } from ".//todos/todo.model";
import { TodoListService } from "./todo-list.service";
import { TodoService } from "./todos/todo.service";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private todoListService: TodoListService, private todoSerivice: TodoService) { }

    getLists() {
        this.http.get('https://damp-sea-61125.herokuapp.com/api/todolists')
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

    addList(list: TodoList) {
        this.http.post('https://damp-sea-61125.herokuapp.com/api/todolist', list)
            .pipe(map((todolist: TodoList) => {
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
            }))
            .subscribe(
                (todolist: TodoList) => {
                    this.todoListService.addList(todolist)
                }
            )
    }

    modifyActiveList() {
        const oldList = this.todoListService.getActiveListById();
        const updatedTodos = this.todoSerivice.getFilteredTodos();
        const newList = {
            ...oldList,
            todos: updatedTodos
        }
        this.http.put('https://damp-sea-61125.herokuapp.com/api/todolist', newList)
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

    modifyCompletedList() {
        const oldList = this.todoListService.getCompletedList();
        const updatedTodos = this.todoListService.getCompletedTodos();
        const newList = {
            ...oldList,
            todos: updatedTodos
        }
        this.http.put('https://damp-sea-61125.herokuapp.com/api/todolist', newList)
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