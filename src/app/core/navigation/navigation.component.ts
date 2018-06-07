import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../../todo-lists/data-storage.service';
import { TodoListService } from '../../todo-lists/todo-list.service';
import { TodoCompletedService } from '../../todo-lists/todos/todo-completed.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, OnDestroy {
  isViewingCompleted: boolean = false;
  searchField: string = '';
  options: string[] = [];
  filteredOptions: string[] = [];
  titleSubscription: Subscription;

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
    });
    this.titleSubscription = this.todoCompletedService.updateSuggestedTitles.subscribe((titles: string[]) => {
      this.options = titles;
    })
  }

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
  }

  onAddTodoList() {
    this.todoListService.modifyAddListStatus(true);
  }

  onFilterChange() {
    this.todoCompletedService.updateFilter(this.searchField);

    this.filteredOptions = this.options.filter((title: string) => {
      return title.toUpperCase().includes(this.searchField.toUpperCase()) && this.searchField.length > 0;
    })
  }

  onFilterSelect(chosenTitle: string) {
    this.searchField = chosenTitle;
    this.onFilterChange();
    this.filteredOptions = [];
  }
}
