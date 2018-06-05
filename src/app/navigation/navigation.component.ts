import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../todo-lists/data-storage.service';
import { TodoListService } from '../todo-lists/todo-list.service';
import { TodoCompletedService } from '../todo-lists/todos/todo-completed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isViewingCompleted: boolean = false;
  searchField: string = '';

  constructor(private dataStorageService: DataStorageService, private todoListService: TodoListService,
    private todoCompletedService: TodoCompletedService, private router: Router) { }

  ngOnInit() {
    this.dataStorageService.getLists();
    this.router.events.subscribe((event) => {
      if (this.router.url === '/completed') {
        this.isViewingCompleted = true;
      } else {
        this.isViewingCompleted = false;
      }
    })
  }

  onAddTodoList() {
    this.todoListService.modifyAddListStatus(true);
  }

  onFilterChange() {
    this.todoCompletedService.updateFilter(this.searchField);
  }
}
