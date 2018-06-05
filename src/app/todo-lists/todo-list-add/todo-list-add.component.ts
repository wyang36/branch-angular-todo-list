import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { TodoList } from '../todo-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-add',
  templateUrl: './todo-list-add.component.html',
  styleUrls: ['./todo-list-add.component.css']
})
export class TodoListAddComponent implements OnInit {
  @ViewChild('f') editForm: NgForm;
  isActive: boolean = false;
  subscription: Subscription;

  constructor(private todoListService: TodoListService, private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.todoListService.updateAddListStatus.subscribe((isAdding: boolean) => {
      this.isActive = isAdding;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRemoveModal() {
    this.todoListService.modifyAddListStatus(false);
    this.editForm.reset();
  }

  onAddList(form: NgForm) {
    const value = form.value;
    this.dataStorageService.addList({
      ...value,
      isCompletedList: false
    }).subscribe(
      (todolist: TodoList) => {
          this.todoListService.addList(todolist)
          this.router.navigate(['/lists', todolist.id]);
      }
  )

    this.onRemoveModal();
  }

}
