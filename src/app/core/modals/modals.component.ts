import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from '../../todo-lists/todo-list.service';
import { Subscription } from 'rxjs';
import { TodoService } from '../../todo-lists/todos/todo.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html'
})
export class ModalsComponent implements OnInit, OnDestroy {
  isAddingList: boolean = false;
  addingListSubscription: Subscription;

  isDeletingList: boolean = false;
  deletingListSubscription: Subscription;

  isEditingTodo: boolean = false;
  editMode: boolean;
  addTodoSubscription: Subscription;
  editTodoSubscription: Subscription;

  isDeletingTodo: boolean = false;
  deletingTodoSubscription: Subscription;

  isCompletingTodo: boolean = false;
  completingTodoSubscription: Subscription;

  constructor(private todoListService: TodoListService, private todoService: TodoService) { }

  ngOnInit() {
    this.addingListSubscription = this.todoListService.updateAddListStatus.subscribe((isAddingList) => {
      this.isAddingList = isAddingList;
    })
    this.deletingListSubscription = this.todoListService.updateDeleteListStatus.subscribe((isDeletingList) => {
      this.isDeletingList = isDeletingList;
    })
    this.addTodoSubscription = this.todoService.updateAddStatus.subscribe((isAdding: boolean) => {
      this.isEditingTodo = isAdding || this.todoService.isEditingTodo;
    })
    this.editTodoSubscription = this.todoService.updateEditStatus.subscribe((isEditing: boolean) => {
      this.editMode = isEditing;
      this.isEditingTodo = this.todoService.isAddingTodo || this.todoService.isEditingTodo;
    })
    this.deletingTodoSubscription = this.todoService.updateDeleteStatus.subscribe((isDeletingTodo) => {
      this.isDeletingTodo = isDeletingTodo;
    })
    this.completingTodoSubscription = this.todoService.updateCompleteStatus.subscribe((isCompletingTodo) => {
      this.isCompletingTodo = isCompletingTodo;
    })
  }

  ngOnDestroy() {
    this.addingListSubscription.unsubscribe();
    this.deletingListSubscription.unsubscribe();
    this.editTodoSubscription.unsubscribe();
    this.addTodoSubscription.unsubscribe();
    this.deletingTodoSubscription.unsubscribe();
    this.completingTodoSubscription.unsubscribe();
  }

}
