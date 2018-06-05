import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { TodoListService } from '../../todo-list.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Input() isCompleted: boolean;
  isOverdue: boolean;

  constructor(private todoService: TodoService, private todoListService: TodoListService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.isOverdue = (this.todo.dueDate < new Date());
  }

  onEdit() {
    this.todoService.modifyEdit(true, this.todo.id);
  }

  onDelete() {
    this.todoService.modifyDelete(true, this.todo.id);
  }

  onComplete() {
    this.todoService.modifyComplete(true, this.todo.id);
  }

}
