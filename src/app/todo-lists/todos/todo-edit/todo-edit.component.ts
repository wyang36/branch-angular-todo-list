import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') editForm: NgForm;
  isActive: boolean = false;
  editMode: boolean = false;
  todo: Todo;
  today: Date = new Date();
  yesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));
  editStatusSubscription: Subscription;
  addStatusSubscription: Subscription;

  constructor(private todoService: TodoService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.addStatusSubscription = this.todoService.updateAddStatus.subscribe((isAdding: boolean) => {
      this.isActive = isAdding || this.todoService.isEditingTodo;
    })

    this.editStatusSubscription = this.todoService.updateEditStatus.subscribe((isEditing: boolean) => {
      this.editMode = isEditing;
      this.isActive = this.todoService.isAddingTodo || this.todoService.isEditingTodo;
      if (this.editMode && this.isActive) {
        this.todo = this.todoService.getActiveTodo();
        this.editForm.setValue({
          title: this.todo.title,
          content: this.todo.content,
          dueDate: this.todo.dueDate
        })
      }
    })
  }

  ngOnDestroy() {
    this.editStatusSubscription.unsubscribe();
    this.addStatusSubscription.unsubscribe();
  }

  onRemoveModal() {
    this.todoService.modifyAdd(false);
    this.todoService.modifyEdit(false, null);
    this.editForm.reset();
  }

  modifyTodo(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      this.todoService.updateTodo({
        ...value,
        id: this.todo.id
      });
      this.dataStorageService.modifyActiveList();
    }
    else {
      //add todo
      this.todoService.addTodo({
        ...value
      });
      this.dataStorageService.modifyActiveList();
    }
    this.onRemoveModal();
  }

}
