import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { DataStorageService } from './todo-lists/data-storage.service';
import { TodoListService } from './todo-lists/todo-list.service';
import { TodoListAddComponent } from './todo-lists/todo-list-add/todo-list-add.component';
import { TodosComponent } from './todo-lists/todos/todos.component';
import { TodoItemComponent } from './todo-lists/todos/todo-item/todo-item.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TodoService } from './todo-lists/todos/todo.service';
import { TodoEditComponent } from './todo-lists/todos/todo-edit/todo-edit.component';
import { TodoDeleteComponent } from './todo-lists/todos/todo-delete/todo-delete.component';
import { TodoCompleteComponent } from './todo-lists/todos/todo-complete/todo-complete.component';
import { TodoCompletedService } from './todo-lists/todos/todo-completed.service';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'lists/:id', component: TodosComponent },
  { path: 'completed', component: TodosComponent },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoListsComponent,
    TodoListAddComponent,
    TodosComponent,
    TodoItemComponent,
    NavigationComponent,
    TodoEditComponent,
    TodoDeleteComponent,
    TodoCompleteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataStorageService,
    TodoListService,
    TodoService,
    TodoCompletedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
