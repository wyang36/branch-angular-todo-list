import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html'
})
export class TodoDeleteComponent implements OnInit {
  todo: Todo;

  constructor(private todoService: TodoService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.todo = this.todoService.getActiveTodo();
  }

  onDelete() {
    this.todoService.deleteTodo(this.todo.id);
    this.dataStorageService.modifyActiveList();
    this.onRemoveModal();
  }

  onRemoveModal() {
    this.todoService.modifyDelete(false, null);
    this.todo = null;
  }

}
