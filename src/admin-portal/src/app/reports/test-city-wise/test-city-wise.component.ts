import { Component, OnInit } from '@angular/core';
import { RegistrationReportService } from "../../shared/services/registration-report/registration-report.service";
import { first } from "rxjs/operators";
import * as moment from "moment";


@Component({
  selector: 'app-test-city-wise',
  templateUrl: './test-city-wise.component.html',
  styleUrls: ['./test-city-wise.component.scss']
})
export class TestCityWiseComponent implements OnInit {
  exam: any;
  reportResult: any;
  reportFilter: any = {
    fromdate: '',
    todate: '',
    examname: ''
  };
  today: any;
  reportdetails: any;


  constructor(private registrationReportService: RegistrationReportService,) { }

  ngOnInit() {
    this.getExam();
    this.reportFilter.fromdate = moment().add(-30, 'days').toDate();
    this.reportFilter.todate = moment().toDate();

  }

    getExam() {
    this.registrationReportService
      .getExam()
      .pipe(first())
      .subscribe(res => {
        this.exam = res;
      });
  }
  initDateRange() {
    this.today = moment().toDate();
  }

  getReportData (){
    alert ("TODO:Avanish not done:");
  }

 
}
