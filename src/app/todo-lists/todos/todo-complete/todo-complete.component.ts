import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../../data-storage.service';
import { TodoListService } from '../../todo-list.service';

@Component({
  selector: 'app-todo-complete',
  templateUrl: './todo-complete.component.html'
})
export class TodoCompleteComponent implements OnInit {
  todo: Todo;

  constructor(private todoListService: TodoListService, private todoService: TodoService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.todo = this.todoService.getActiveTodo();
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
