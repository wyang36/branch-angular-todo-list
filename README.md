# To-do lists

This is a front end application written with Angular 6, SemanticUI, and some extra sass. Users can create a to-do list, add a to-do to a list, edit an existing to-do, delete a to-do, and label a to-do as completed. Once a to-do is completed, it's removed from a list and placed in a "Completed" section, which has a local search feature. 

## File structure

The following chart explains the file structure inside the app folder detailed to each small piece. Each piece may contain some or all of the following:
1) .ts file. This is the file containing all the business logic
2) .html file. This is the html template, will only exist if the piece is a component.
3) .scss file. This is the file that contains styling that needs to be encapsulated to the component. Not all components have this, 
4) .spec.ts file. This file contains unit tests for that piece.
```
app 
└─── core  
│    |   home.component          -> Welcome page, displays when no list is selected and use is not on "Completed" page
│    |   modals.component        -> Central place to control modals for editting. Individual ones are place in the todo-lists folder organized by its actual use
|    |   navigation.component    -> Component for the top menu and side drawer
│   
└─── todo-lists 
|    │    todo-list-add.component     -> Modal for when user adds a list
|    │    todo-list-delete.component  -> Modal for when user deletes a list
|    └─── todos
|    |    └───  todo.complete.component   -> Modal for when user completes a to-do
|    |    |───  todo.delete.component     -> Modal for when user deletes a to-do
|    |    |───  todo.edit.component       -> Modal for when user adds or edits a to-do
|    |    |───  todo.item.component       -> Component for an individual to-do
|    |    |   todo-completed.service    -> Service for all the actions manipulating completed to-dos
|    |    |   todo.model                -> Class and constructor for a to-do
|    |    |   todo.service              -> Service for all the actions manipulating active to-dos
|    |    |   todos.component           -> Component for the container of all to-dos being displayed
|    |
|    |    data-storage.service   -> Service for HTTP calls to get and send data
|    |    todo-list.model        -> Class and constructor for a to-do list
|    |    todo-list.service      -> Service for all the actions manipulating lists
|    |    todo-lists.component   -> Component for list of to-do lists displayed in the side drawer 
|
|   app.component  
|   app.module  
```

## How to run this program?

You can use the demo link [here](https://branch-todo-list.firebaseapp.com/), or you can run it on your local machine with the instructions below.

1. Install NodeJS on your machine if you have not installed it. Link is [here](https://nodejs.org/en/)
2. Install Angular CLI on your machine if you have not installed it. You can do so by running "npm install -g @angular/cli"
3. Download this repo, and navigate to the folder.
4. Run "npm install"
5. Run "ng serve"
6. You can go to your browser and access it on http://localhost:4200

## Special features

1. Search bar will only appear when you are viewing completed to-dos. Auto complete results will appear as you type and will show all titles matching what you typed. The list will also update as you type but will show all completed to-dos with **title or notes** matching what's in the search bar. 
2. A list can only be deleted if there are no to-dos in it. The delete button will disappear once you added a to-do, and re-appear once you deleted all of them.
3. When adding a list, the title is a required field, and when adding/editing a to-do, the title and due date are required fields. You can not put all spaces in there either.