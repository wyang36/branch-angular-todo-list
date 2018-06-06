import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { Subscription } from 'rxjs';
import { Todo } from '../todos/todo.model';
import { TodoService } from './todo.service';
import { DataStorageService } from '../data-storage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoCompletedService } from './todo-completed.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  todoSubscription: Subscription;
  completedTodoSubscription: Subscription;
  todos: Todo[] = [];
  isViewingCompleted: boolean = false;

  constructor(private todoListService: TodoListService, private todoService: TodoService,
    private dataStorageService: DataStorageService, private todoCompletedService: TodoCompletedService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (this.router.url !== '/completed') {
        if (this.todoListService.checkIfListExist(params['id'])) {
          this.todoListService.ChooseCurrentList(params['id']);
          this.todoListService.setTodosOfCurrentList();
        } else {
          this.router.navigate(['/']);
        }
      }
    })
    this.todoSubscription = this.todoService.updateTodos.subscribe((todos: Todo[]) => {
      if (!this.isViewingCompleted)
        this.todos = todos;
    });
    this.completedTodoSubscription = this.todoCompletedService.updateCompletedTodos.subscribe((todos: Todo[]) => {
      if (this.isViewingCompleted)
        this.todos = todos;
    })

    if (this.router.url === '/completed') {
      this.isViewingCompleted = true;
      this.todos = this.todoCompletedService.getFilteredTodos();
    } else {
      this.isViewingCompleted = false;
      this.todos = this.todoService.getAllTodos();
    }
  }

  ngOnDestroy() {
    this.todoSubscription.unsubscribe();
    this.completedTodoSubscription.unsubscribe();
  }

  onAddTodo() {
    this.todoService.modifyAdd(true);
  }

  onDeleteList() {
    this.todoListService.modifyDeleteListStatus(true);
  }

}
