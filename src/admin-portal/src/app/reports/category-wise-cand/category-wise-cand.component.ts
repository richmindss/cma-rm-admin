import { Component, OnInit } from '@angular/core';
import { RegistrationReportService } from "../../shared/services/registration-report/registration-report.service";
import { first } from "rxjs/operators";
import * as moment from "moment";
import { CandidateCatogoryReportService } from '../../shared/services/candidate-catogory-report/candidate-category-report.service'
@Component({
  selector: 'app-category-wise-cand',
  templateUrl: './category-wise-cand.component.html',
  styleUrls: ['./category-wise-cand.component.scss']
})
export class CategoryWiseCandComponent implements OnInit {
  reportResult: any;
  reportFilter: any = {
    fromdate: '',
    todate: '',
    examname: ''
  };
  exam: any;
  today: any;
  reportdetails: any;
  constructor(private registrationReportService: RegistrationReportService,
    private candidateCatogoryReportService: CandidateCatogoryReportService
  ) { }

  ngOnInit() {
    this.getExam();
    this.initDateRange();

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

  getReportData() {
    var data = Object.assign({}, this.reportFilter);
    data.fromdate = moment(data.fromdate).format("DDMMYYYY");
    data.todate = moment(data.todate).format("DDMMYYYY");
    this.candidateCatogoryReportService
      .getReportData(data)
      .pipe(first())
      .subscribe(res => {
        this.reportdetails = res;
      })

  }





}
