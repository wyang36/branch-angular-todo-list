import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { DataStorageService } from '../data-storage.service';
import { TodoList } from '../todo-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-add',
  templateUrl: './todo-list-add.component.html'
})
export class TodoListAddComponent implements OnInit {
  addListForm: FormGroup;

  constructor(private todoListService: TodoListService, private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
    this.addListForm = new FormGroup({
      'title': new FormControl('', [Validators.required, this.notAllSpaceValidator.bind(this)])
    });
  }

  onRemoveModal() {
    this.todoListService.modifyAddListStatus(false);
    this.addListForm.reset();
  }

  onAddList() {
    const value = this.addListForm.value;
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

  //Validator
  notAllSpaceValidator(control: FormControl): { [s: string]: boolean } {
    if ((control.value || '').trim().length === 0) {
      return { 'whitespace' : true }
    }
    return null;
  }
}
