import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { Subscription } from 'rxjs';
import { Todo } from '../todos/todo.model';
import { TodoService } from './todo.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  currentListId: string;
  listSubscription: Subscription;
  todoSubscription: Subscription;
  viewCompletedSubscription: Subscription;
  todos: Todo[];
  isListSelected: boolean = false;
  isViewingCompleted: boolean = false;

  constructor(private todoListService: TodoListService, private todoService: TodoService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.listSubscription = this.todoListService.updateCurrentListId.subscribe((id: string) => {
      this.currentListId = id;
      this.isListSelected = this.currentListId !== undefined;
      this.todoListService.setTodosOfCurrentList();
    });
    this.todoSubscription = this.todoService.updateTodos.subscribe((todos: Todo[]) => {
      //if (this.isViewingCompleted)
      //  this.todoListService.setTodosOfCompleted();
      this.todos = todos;
    });
    this.viewCompletedSubscription = this.todoListService.updateViewingCompletedStatus.subscribe((status: boolean) => {
      this.isViewingCompleted = status;
      if (this.isViewingCompleted)
        this.todoListService.setTodosOfCompleted();
    })
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    this.todoSubscription.unsubscribe();
    this.viewCompletedSubscription.unsubscribe();
  }

  onAddTodo() {
    this.todoService.modifyAdd(true);
  }

  onDeleteList() {
    if (this.todos.length === 0) {
      this.dataStorageService.deleteList(this.currentListId);
      this.isListSelected = false;
    }
  }

}
