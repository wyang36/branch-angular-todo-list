import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoList } from './todo-list.model';
import { TodoListService } from './todo-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit, OnDestroy {
  lists: TodoList[];
  subscription: Subscription;

  constructor(private todolistService: TodoListService) { }

  ngOnInit() {
    this.lists = this.todolistService.getActiveLists();
    this.subscription = this.todolistService.updatedLists.subscribe((lists: TodoList[]) => {
      this.lists = lists;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(id: string) {
    this.todolistService.ChooseCurrentList(id);
  }

  checkIsActive(id: string) {
    return id === this.todolistService.currentListId;
  }
}
