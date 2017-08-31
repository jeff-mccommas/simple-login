import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/prek12/context', pathMatch: 'full' },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


