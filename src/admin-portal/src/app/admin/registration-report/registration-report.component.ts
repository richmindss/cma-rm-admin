import { Component, OnInit } from "@angular/core";
import { RegistrationReportService } from "../../shared/services/registration-report/registration-report.service";
import { first } from "rxjs/operators";
import * as moment from 'moment';
@Component({
  selector: "app-registration-report",
  templateUrl: "./registration-report.component.html",
  styleUrls: ["./registration-report.component.scss"]
})
export class RegistrationReportComponent implements OnInit {
  details: any;
  pageSize = 10;
  currentPage = 1;
  userCount = 0;
  filter = {};
  constructor(private registrationReportApi: RegistrationReportService) {}

  ngOnInit() {
    this.getRegistrationReport();
  }
  fetchUserData(e) {
    this.currentPage = e;

    this.getRegistrationReport();
  }
  getRegistrationReport() {
    this.registrationReportApi
      .getRegistrationReport(this.currentPage, this.pageSize, this.filter)
      .pipe(first())
      .subscribe(res => {
        this.details = res["finalResult"];
        this.userCount = res["count"];
      });
  }

  getDOB (x){
    var d = new Date (x.year, x.month, x.day);
    return moment (d).format ("DD/MM/YYYY");
  }
}
