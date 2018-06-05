import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../../data-storage.service';
import { TodoListService } from '../../todo-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-complete',
  templateUrl: './todo-complete.component.html',
  styleUrls: ['./todo-complete.component.css']
})
export class TodoCompleteComponent implements OnInit, OnDestroy {
  isActive: boolean = false;
  subscription: Subscription;
  todo: Todo = new Todo('', '', new Date(), '');

  constructor(private todoListService: TodoListService, private todoService: TodoService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.todoService.updateCompleteStatus.subscribe((isCompleting: boolean) => {
      this.isActive = isCompleting;
      this.todo = this.todoService.getActiveTodo();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onMove() {
    this.todoListService.MoveTodoToCompleted(this.todo);
    this.dataStorageService.modifyActiveList();
    this.dataStorageService.modifyCompletedList();
    this.onRemoveModal();
  }

  onRemoveModal() {
    this.todoService.modifyComplete(false, null);
    this.todo = new Todo('', '', new Date(), '');
  }
}
