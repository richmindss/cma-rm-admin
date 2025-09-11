import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  payment: any = {
    fromdate: '',
    todate: '',
    mode: '',
    status: '',
    reporttype: '',
    exam: ''
  };

  constructor() {
    this.payment.fromdate = moment().toDate();
    this.payment.todate = moment().toDate();
  }

  ngOnInit() {
  }

}
