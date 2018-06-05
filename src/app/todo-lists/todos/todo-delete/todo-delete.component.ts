import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../../data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: ['./todo-delete.component.css']
})
export class TodoDeleteComponent implements OnInit {
  isActive: boolean = false;
  subscription: Subscription;
  todo: Todo = new Todo('', '', new Date(), '');

  constructor(private todoService: TodoService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.todoService.updateDeleteStatus.subscribe((isDeleting: boolean) => {
      this.isActive = isDeleting;
      this.todo = this.todoService.getActiveTodo();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.todoService.deleteTodo(this.todo.id);
    this.dataStorageService.modifyActiveList();
    this.onRemoveModal();
  }

  onRemoveModal() {
    this.todoService.modifyDelete(false, null);
    this.todo = new Todo('', '', new Date(), '');
  }

}
