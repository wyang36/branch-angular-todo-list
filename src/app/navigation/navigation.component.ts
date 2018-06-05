import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../todo-lists/data-storage.service';
import { TodoListService } from '../todo-lists/todo-list.service';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo-lists/todos/todo.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isViewingCompleted: boolean = false;
  searchField: string = '';
  subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private todoListService: TodoListService, private todoService: TodoService) { }

  ngOnInit() {
    this.dataStorageService.getLists();
    this.subscription = this.todoListService.updateViewingCompletedStatus.subscribe((status: boolean) => {
      this.isViewingCompleted = status;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onViewCompleted() {
    this.todoListService.modifyViewingCompletedStatus(true);
  }

  onAddTodoList() {
    this.todoListService.modifyAddListStatus(true);
  }

  onFilterChange() {
    this.todoService.updateFilter(this.searchField);
  }
}
