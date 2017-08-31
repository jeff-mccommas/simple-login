import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Student } from '../../../models/prek12/student';
import { Section } from '../../../models/prek12/section';
import { Prek12Service } from '../../../services/prek12/prek12.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
students: Student[];
classData: Section;
id: number;
  constructor(
    private service: Prek12Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.service.getStudentsFromSectionId(+params['id']))
      .subscribe((classData: Section) => {
        this.classData = classData;
        this.students = classData.students;
      }, (err: any) => {
        console.log('error occurs');
      });
    this.id = +this.route.snapshot.params['id'];
    // //console.log(id);
    // this.students = this.service.getStudentsFromClassId(this.id);
  }
  onSelect(student: Student): void {
    this.router.navigate(['/prek12/context', this.id, 'students', student.id]);
  }

}
