import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import {
  SimpleLayoutComponent
  
} from './containers';


export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin Dashboard'
    }, 
    redirectTo: 'admin',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
