import { Injectable, EventEmitter } from '@angular/core';
import { Section } from '../../models/prek12/section';
// import { SECTIONS } from "../../mockdata/prek12/initial-data";

import {Student} from '../../models/prek12/student';
import {JWT} from '../../models/prek12/jwt';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Prek12Service {
    private headers = new Headers({'Content-Type': 'application/json'});
    private sectionsUrl = 'api/context';  // URL to web api
    // configVal: EventEmitter<any> = new EventEmitter();
    private contextData: Section;

    constructor(private http: Http) { }

    // getSections(): Promise<Section[]> {
    //     // console.log(SECTIONS);
    //     return this.http.get(this.sectionsUrl)
    //             .toPromise()
    //             .then(response => response.json() as Section[])
    //             .catch(this.handleError);
    // }
    getSection(id: number): Promise<Section> {
        // console.log(SECTIONS);
        const url = `${this.sectionsUrl}/${id}`;
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as Section)
                .catch(this.handleError);
    }
    getStudentsFromSectionId(id: number): Promise<Section> {
        if (!this.contextData){
            return this.getSection(id)
             .then(classData => {
                 this.contextData = classData;
                return classData;
             });
        }else {
            return new Promise((resolve) => resolve(this.contextData));
        }
    }
    getStudentFromId(sectionId: number, studentId: string): Promise<Student> {
        return this.getStudentsFromSectionId(sectionId).then((data) => {
            const studentData = data.students.filter(item => {
                if (item.id === studentId) { return true; }
            });
            return studentData[0];
        });
    }
    validateUser(reqBody: any): Promise<any> {
        const url = `api/idmLogin`;
        return this.http.post(url, reqBody)
            .toPromise()
                .then(response => response.json())
                .catch(e => this.handleError(e.json()));
    }
    showJWT(): Promise<any> {
        return this.http.get('api/jwt')
                .toPromise()
                .then(response => response.json().res as JWT)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error);
    }
}
