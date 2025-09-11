import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayVeriMainComponent } from './pay-veri-main/pay-veri-main.component';
import { PayVeriDetailComponent } from './pay-veri-detail/pay-veri-detail.component';
import { PayVeriActionComponent } from './pay-veri-action/pay-veri-action.component';
import { PaymentRouteModule } from './payment.route.module';
import {PaymentVerifictionListComponent} from './payment-verification-list/payment-verification-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';



@NgModule({
  declarations: [PayVeriMainComponent, PayVeriDetailComponent, 
                PayVeriActionComponent,
                PaymentVerifictionListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaymentRouteModule
  ]
})
export class PaymentModule { }
