import { Component, OnDestroy } from '@angular/core';
import { SuiLocalizationService } from 'ng2-semantic-ui';
import en from 'ng2-semantic-ui/locales/en-US';
import { DataStorageService } from './todo-lists/data-storage.service';
import { TodoListService } from './todo-lists/todo-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public localizationService: SuiLocalizationService) {
    localizationService.load("en-US", en);
    localizationService.setLanguage("en-US");
  }

  ngOnInit() { }
}
