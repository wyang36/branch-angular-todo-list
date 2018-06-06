import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html'
})
export class TodoEditComponent implements OnInit {
  editForm: FormGroup;
  @Input() editMode: boolean = false;
  todo: Todo;
  today: Date = new Date();
  yesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));

  constructor(private todoService: TodoService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let title = '';
    let dueDate = null;
    let content = '';
    if (this.editMode) {
      this.todo = this.todoService.getActiveTodo();
      title = this.todo.title;
      dueDate = this.todo.dueDate;
      content = this.todo.content;
    }
    this.editForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'dueDate': new FormControl(dueDate, Validators.required),
      'content': new FormControl(content)
    })
  }

  onRemoveModal() {
    this.todoService.modifyAdd(false);
    this.todoService.modifyEdit(false, null);
    this.editForm.reset();
  }

  modifyTodo() {
    const value = this.editForm.value;
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
