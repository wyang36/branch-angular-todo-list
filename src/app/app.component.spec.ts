import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { SuiLocalizationService } from 'ng2-semantic-ui';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    let localizationServiceSpy: jasmine.SpyObj<SuiLocalizationService>;

    beforeEach(async(() => {
        localizationServiceSpy = jasmine.createSpyObj('SuiLocalizationService', ['load' , 'setLanguage']);
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: SuiLocalizationService, useValue: localizationServiceSpy }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
