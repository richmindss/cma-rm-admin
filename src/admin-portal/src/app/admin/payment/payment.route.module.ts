import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthguardService } from "../../shared";
 
import {PayVeriMainComponent} from "./pay-veri-main/pay-veri-main.component";
import {PayVeriDetailComponent} from './pay-veri-detail/pay-veri-detail.component';
const routes: Routes = [
  {
    path: '',   
    canActivate: [
        AuthguardService
    ],
    component: PayVeriMainComponent,
     
  },
  {
    path: ':examid/users/:userid',   
    canActivate: [
        AuthguardService
    ],
    component: PayVeriDetailComponent,
     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRouteModule { }
