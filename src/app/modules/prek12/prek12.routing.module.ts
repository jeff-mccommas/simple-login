import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Prek12Component } from './prek12.component';
// import {SectionListComponent} from './section-list/section-list.component';
import {StudentListComponent} from './student-list/student-list.component';
import { CodeValidatorComponent } from './code-validator/code-validator.component';

// const routes: Routes = [
//   { path: 'prek12/sections',  component: Prek12Component },
//   { path: 'prek12/section/:id/students',  component: StudentListComponent },
//   { path: 'prek12/section/:id/student/:id',  component: CodeValidatorComponent }
// ];
const routes: Routes = [
  {
    path: 'prek12/context',
    component: Prek12Component,
    children: [
      // {
      //   path : '',
      //   component: SectionListComponent
      // },
      {
        path : ':id/students',
        component: StudentListComponent
      },
      {
        path : ':contextid/students/:id',
        component: CodeValidatorComponent
      }
    ]
   }
  // { path: 'prek12/section/:id/students',  component: StudentListComponent },
  // { path: 'prek12/section/:id/student/:id',  component: CodeValidatorComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class Prek12RoutingModule {}
