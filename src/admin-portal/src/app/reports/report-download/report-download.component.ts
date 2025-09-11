import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RegistrationReportService } from "src/app/shared";
import { first } from "rxjs/operators";
import { CandidateService,CoreService } from 'src/app/shared/services';
import { ConstantService } from "src/app/shared/services/constant/constant.service";
import * as moment from "moment";


@Component({
  selector: "app-report-download",
  templateUrl: "./report-download.component.html",
  styleUrls: ["./report-download.component.scss"]
})
export class ReportDownloadComponent implements OnInit {
  
  pageSize = 25;
  currentPage = 1;
  reportsCount=0;
  reports=[];
  error:any;
  freitag= false;

  constructor(
    private registrationReportService: RegistrationReportService,
    private core: CoreService,
    private constantApi: ConstantService 
  ) {}

  ngOnInit() {
    this.getReports();
  }

  getAllReports() {
    this.reports = [];
    this.getReports();
  }
  getReports () {

    this.registrationReportService
    .getAllReports(this.currentPage, this.pageSize )
    .pipe(first())
    .subscribe(res => {
      this.reports = res["data"];
      this.reportsCount = res["count"];
    });
  }
  fetchReportData(e) {
    this.currentPage = e;
    this.getReports();
  }
  onDownload(reportId){
    this.error = null;
    this.freitag = true;
    this.registrationReportService
    .downloadReport(reportId)
    .pipe(first())
    .subscribe(res => {
      if(res["error"]){
        this.error = res["error"];
        this.freitag = false;
        return;
      } else {
        var a = document.createElement('a');
                var blob = new Blob([s2ab(atob(res["buffer"]))], {
                    type: ''
                });
                a.href = URL.createObjectURL(blob);
                a.download = res["name"];
                a.click();
                this.freitag = false;
      };

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
      
    
    });
  }

  

}
