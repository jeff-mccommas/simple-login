import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prek12Component } from './prek12.component';
import { CodeValidatorComponent } from './code-validator/code-validator.component';
import {Prek12RoutingModule} from './prek12.routing.module';

import { Prek12Service } from '../../services/prek12/prek12.service';
// import { SectionListComponent } from './section-list/section-list.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  imports: [
    CommonModule,
    Prek12RoutingModule
  ],
  declarations: [Prek12Component, CodeValidatorComponent, StudentListComponent],
  exports: [Prek12Component],
  providers: [ Prek12Service ]
})
export class Prek12Module { }
