import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
import {HomeComponent} from './home.component';
//import {HomeLayoutComponent} from '../../containers/home-layout/home-layout.component';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {UseriddefinitionComponent} from '../useriddefinition/useriddefinition.component';
import {LogoNameConfigComponent} from '../logo-name-config/logo-name-config.component';


const routes: Routes = [
  {
    path: 'home',
    data: {
      title: ''
    },
    
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Admin Home'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Admin Home'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Admin Home'
        }
      }, 
      {
        path: 'logo-name-config',
        component: LogoNameConfigComponent,
        data: {
          title: 'Admin Home'
        }
      },
      {
        path: 'useriddefinition',
        component: UseriddefinitionComponent,
        data: {
          title: 'Admin Home'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 

export class HomeRoutingModule { }
