import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
*/
import {LoginComponent} from './login/login.component';
import {ForgotpassComponent} from './forgotpass/forgotpass.component';
import {SimpleLayoutComponent} from '../containers/simple-layout/simple-layout.component';

const routes: Routes = [
  {
    path: 'pages',
    data: {
      title: ''
    },
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },{
        path: 'forgotpass',
        component: ForgotpassComponent,
        data: {
          title: 'Forgot Password'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
