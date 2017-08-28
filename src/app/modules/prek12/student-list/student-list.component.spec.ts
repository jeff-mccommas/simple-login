import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { StudentListComponent } from './student-list.component';
import {by} from "protractor";
describe('StudentListComponent', () => {
    let component: StudentListComponent;
    let fixture: ComponentFixture<StudentListComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ StudentListComponent ]
        });
        fixture = TestBed.createComponent(StudentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
