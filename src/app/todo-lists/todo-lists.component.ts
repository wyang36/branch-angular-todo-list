import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoList } from './todo-list.model';
import { TodoListService } from './todo-list.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html'
})
export class TodoListsComponent implements OnInit, OnDestroy {
  lists: TodoList[];
  subscription: Subscription;
  //id: string;

  constructor(private todolistService: TodoListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.lists = this.todolistService.getActiveLists();
    this.subscription = this.todolistService.updatedLists.subscribe((lists: TodoList[]) => {
      this.lists = lists;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
