import { Component, OnInit } from "@angular/core";
import { PaymentVerificationListService } from "../../../shared/services/payment-verification-list/payment-verification-list.service";
import { ConstantService } from "../../../shared/services/constant/constant.service";
import { RegistrationReportService } from "../../../shared/services/registration-report/registration-report.service";
import { first } from "rxjs/operators";
import { Router } from '@angular/router';
import { ApplicationConfiguartionService } from 'src/app/shared';

@Component({
  selector: "app-payment-verification-list",
  templateUrl: "./payment-verification-list.component.html",
  styleUrls: ["./payment-verification-list.component.scss"]
})
export class PaymentVerifictionListComponent implements OnInit {
  exam: any;
  verificationStatus: any = [];
  examlist: any = [];
  examid: any = "";
  verifyStatus: any;
  statuscode: any;
  statusResult: any;
  status: any;
  error: any;
  searchResult: any;

  filter: any = {
    key: ""
  };

  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  statusCount = 0;

  /** end pagination */
  constructor(
    private router: Router,
    private paymentVerificationListService: PaymentVerificationListService,
    private constantApi: ConstantService,
    private registrationReportApi: RegistrationReportService,
    private applicationVerificationService: ApplicationConfiguartionService
  ) {}

  ngOnInit() {
    this.getstatus();
    this.getApplication();
  }

  onSearch() {
    this.error = "";
   // console.log ("status == ", this.status, this.examid);
    if (!this.status) {
      this.error = "Please select   Payment Status";
      return false;
    }
    if (!this.examid) {
      this.error = "Please select   Exam";
      return false;
    }
    this.paymentVerificationListService
      .getPaymentStatus(
        this.status,
        this.examid,
        this.currentPage,
        this.pageSize,
        this.filter
      )
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.searchResult = res["finalResult"];
          this.statusCount = res["count"];
        }
      });
  }

  fetchStatusData(e) {
    this.currentPage = e;

    this.onSearch();
  }

  getstatus() {
    this.constantApi
      .getConstantValue("STATUSCODE")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.statusResult = res;
        }
      });
  }

  getApplication() {
    this.applicationVerificationService
      .getApplication()
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.verificationStatus = res;
          this.getExam();
        }
      });
  }

  getExam() {
    this.registrationReportApi
      .getExam()
      .pipe(first())
      .subscribe(res => {
        this.exam = res;
        this.examid = this.exam._id;
        this.examlist = this.exam;

        
      });
  }

  onVerify(s) {
    this.router.navigate (["admin/payments/" + s.examid + "/users/" + s.userid ])
    // this.paymentVerificationListService
    //   .updateVerifiedStatus(s)
    //   .pipe(first())
    //   .subscribe(res => {
    //     this.onSearch();
    //   });
  }
}
