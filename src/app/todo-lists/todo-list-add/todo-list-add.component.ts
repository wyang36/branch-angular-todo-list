import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-todo-list-add',
  templateUrl: './todo-list-add.component.html',
  styleUrls: ['./todo-list-add.component.css']
})
export class TodoListAddComponent implements OnInit {
  @ViewChild('f') editForm: NgForm;
  isActive: boolean = false;
  subscription: Subscription;

  constructor(private todoListService: TodoListService, private dataStorageService: DataStorageService) { }

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
    });

    this.onRemoveModal();
  }

}
