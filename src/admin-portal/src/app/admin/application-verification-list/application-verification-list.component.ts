import { Component, OnInit } from "@angular/core";
import { RegistrationReportService } from "../../shared/services/registration-report/registration-report.service";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { first } from "rxjs/operators";
import { ApplicationConfiguartionService } from 'src/app/shared';
@Component({
  selector: "app-application-verification-list",
  templateUrl: "./application-verification-list.component.html",
  styleUrls: ["./application-verification-list.component.scss"]
})
export class ApplicationVerificationListComponent implements OnInit {
  appstatus: any;
  examid: any = "";
  applist: any = [];
  verificationStatusResult: any;
  examlist: any = [];
  error: any;

  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  userCount = 0;
  verificationStatus: any;
  exam: any;

  public applicationConfiguration: any;

  constructor(
    private registrationReportApi: RegistrationReportService,
    private constantApi: ConstantService,
    private applicationVerificationService: ApplicationConfiguartionService
  ) {}

  ngOnInit() {
    this.getVerificationStatus();
    this.getApplication();
  }

  getApplicationReport() {
    this.error = "";

    if (!this.appstatus) {
      this.error = "Please select Exam and Application Status";
      return false;
    }

    this.registrationReportApi
      .getApplicationReport(
        this.currentPage,
        this.pageSize,
        this.examid,
        this.appstatus
      )
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.applist = res["canResult"];
          this.userCount = res["count"];
        }
      });
  }

  fetchUserData(e) {
    this.currentPage = e;
    this.getApplicationReport();
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
        if (res) {
          this.exam = res;
          this.examlist = this.exam;

          /*
          for (var i = 0; i < this.verificationStatus.length; i++) {
            for (var j = 0; j < this.exam.length; j++) {
              if (this.exam[j]._id == this.verificationStatus[i].examid) {
                if (this.verificationStatus[i].answers[0].answer == "on") {
                  this.examlist.push(this.exam[j]);
                }
              }
            }
          }

*/

        }
      });
  }

  getVerificationStatus() {
    this.constantApi
      .getVerificationStatus("VERIFICATION_STATUS")
      .pipe(first())
      .subscribe(res => {
        this.verificationStatusResult = res;
      });
  }
}
