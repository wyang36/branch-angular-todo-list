import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { DataStorageService } from '../data-storage.service';
import { TodoList } from '../todo-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-delete',
  templateUrl: './todo-list-delete.component.html',
  styleUrls: ['./todo-list-delete.component.css']
})
export class TodoListDeleteComponent implements OnInit {
  list: TodoList;

  constructor(private todoListService: TodoListService, private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
    this.list = this.todoListService.getActiveListById();
  }

  onDelete() {
    this.dataStorageService.deleteList(this.todoListService.currentListId);
    this.router.navigate(['/']);
    this.onRemoveModal();
  }

  onRemoveModal() {
    this.todoListService.modifyDeleteListStatus(false);
    this.list = new TodoList(null, '', [], false);
  }
}
