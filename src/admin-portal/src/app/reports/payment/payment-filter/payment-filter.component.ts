import { Component, OnInit, Input } from "@angular/core";
import { RegistrationReportService } from "src/app/shared";
import { first } from "rxjs/operators";
import { PaymentService } from 'src/app/shared/services/reports/payment.service';
import { ConstantService } from "src/app/shared/services/constant/constant.service";

@Component({
  selector: "app-payment-filter",
  templateUrl: "./payment-filter.component.html",
  styleUrls: ["./payment-filter.component.scss"]
})
export class PaymentFilterComponent implements OnInit {
  @Input() payment: any;
  today = new Date();
  exam: any;
  paymentStatus: any;

  constructor(
    private constantApi: ConstantService,
    private registrationReportService: RegistrationReportService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.getExam();
    this.getPaymentStatus();
  }

  getExam() {
    this.registrationReportService
      .getExam()
      .pipe(first())
      .subscribe(res => {
        this.exam = res;
      });
  }

  getPaymentStatus() {

    this.constantApi
    .getConstantValue("STATUSCODE")
    .pipe(first())
    .subscribe(res => {
      if (res) {
        this.paymentStatus = res; 
      }
    });

    // this.paymentService.getPaymentStatus().subscribe(res => {
    //   this.paymentStatus = res;
    // })
  }

  compareFn (a, b){
    if (a && b && a.code  && b.code){
      return a.code == b.code;
    }

    if (a && b && a._id && b._id){
      return a._id == b._id;
    }

    return false;
  }
}
