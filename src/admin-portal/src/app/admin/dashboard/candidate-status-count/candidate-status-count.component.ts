import { Component, OnInit } from "@angular/core";
import { CandidateStatusCountService } from "../../../shared/services/candidate-status-count/candidate-status-count.service";
import { first } from "rxjs/operators";
import { PaymentVerificationListService } from "../../../shared/services/payment-verification-list/payment-verification-list.service";
@Component({
  selector: "app-candidate-status-count",
  templateUrl: "./candidate-status-count.component.html",
  styleUrls: ["./candidate-status-count.component.scss"]
})
export class CandidateStatusCountComponent implements OnInit {
  registeredCandidateCount: any;
  totalcount: any;
  appPendingStatus: any;
  appSubmittedStatus: any;
  totalPending: any;
  totalSubmitted: any;
  pen: any;
  sub: any;
  paymentCompletedResult: any;
  paymentPendingResult: any;
  paymentVerifiedResult: any;
  paymentVerifiedRejected: any;
  paymentData: any = [];

  constructor(
    private candidateStatusCountService: CandidateStatusCountService,
    private paymentVerificationListService: PaymentVerificationListService
  ) {}

  ngOnInit() {
    this.getRegCandidate();
    this.getAppSubmittedStatus(); 
    this.getPaymentStatusList();
  }

  getRegCandidate() {
    this.candidateStatusCountService
      .getRegisteredCandidate()
      .pipe(first())
      .subscribe(res => {
        this.registeredCandidateCount = res;
        this.totalcount = this.registeredCandidateCount.total_count;
      });
  }

  getAppSubmittedStatus() {
    this.candidateStatusCountService
      .getAppSubmittedStatus()
      .pipe(first())
      .subscribe(res => {
        this.appSubmittedStatus = res;
        this.totalSubmitted = this.appSubmittedStatus.total_count;
      });
  }

  onSort(e) {}

  getPaymentStatusList() {
    this.paymentVerificationListService
      .getPaymentStatusList()
      .pipe(first())
      .subscribe(res => {
        this.paymentData = res;

        const completed = this.paymentData.find(item => item._id === 'payment_completed')?.count || 0;
          this.paymentData = this.paymentData.map(item => {
            if (item._id === 'payment_verified') {
              return { ...item, count: item.count + completed };
            }
            return item;
          });
         this.paymentData = this.paymentData.filter(item => item._id !== 'payment_completed');
         this.getPaymentStatus(this.paymentData);
      });
  }

  getPaymentStatus(paymentData) {
    for (var i = 0; i < paymentData.length; i++) {
      if (paymentData[i]._id == "payment_completed") {
        paymentData[i]["name"] = "Payment Completed";
      }
      if (paymentData[i]._id == "payment_pending") {
        paymentData[i]["name"] = "Payment Pending";
      }
      if (paymentData[i]._id == "payment_verified") {
        paymentData[i]["name"] = "Payment Verified";
      }
      if (paymentData[i]._id == "payment_failed") {
        paymentData[i]["name"] = "Payment Failed";
      }
    }
  }

   
}
