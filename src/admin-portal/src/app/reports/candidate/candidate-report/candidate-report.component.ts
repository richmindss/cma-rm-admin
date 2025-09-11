import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RegistrationReportService } from "src/app/shared";
import { first } from "rxjs/operators";
import { CandidateService,CoreService } from 'src/app/shared/services';
import { ConstantService } from "src/app/shared/services/constant/constant.service";
import * as moment from "moment";

@Component({
  selector: "app-candidate-report",
  templateUrl: "./candidate-report.component.html",
  styleUrls: ["./candidate-report.component.scss"]
})
export class CandidateReportComponent implements OnInit {
  @Input() candidate :any 
  today = new Date();
  exam: any;
  appStatus: any;
  error:any;
  success:any;
  report: any;
  pageSize = 25;
  currentPage = 1;
  rowCount = 0;
  isExport = false;
  freitag= false;
  headers:any;
  
  constructor(
    private registrationReportService: RegistrationReportService,
    private core: CoreService,
    private constantApi: ConstantService ) { }

  ngOnInit() {
    
      this.candidate.fromdate = moment().toDate();
      this.candidate.todate = moment().toDate();
    
    this.getExam();
    // this.getApplicationStatus();
  }

  getExam() {
    this.registrationReportService
      .getExam()
      .pipe(first())
      .subscribe(res => {
        this.exam = res;
      });
     
  }

  compareFn (a, b){
    return this.core.compareFn (a, b);
  }
  getReport (){
    this.error = null;
    this.isExport=false;
    if(!this.candidate || !this.candidate.reporttype){
      this.error = "Please choose 'Report Type' ";
      return;
    }
    if(!this.candidate || !this.candidate.exam || this.candidate.exam.length <1 ){
      this.error = "Please select 'Exam Name' ";
      return;
    }
    
    this.registrationReportService
    .getCandidateReport(this.currentPage, this.pageSize, this.candidate)
    .pipe(first())
    .subscribe(res => {
      this.report = res;
      this.rowCount = res["count"];
      this.headers = res["headers"];
      if(res["count"]==0){
        this.error = "No records found. Please choose another filter";
        this.isExport=false;
        return;
      } else {
        this.isExport=true;
      }
    
    });
  }

  onChange(value){
    this.report = {data:[]};
    this.rowCount = 0;
    this.headers = [];
  }
  getApplicationStatus() {

    //CANDIDATESTATUS

    this.constantApi
    .getConstantValue("CANDIDATESTATUS")
    .pipe(first())
    .subscribe(res => {
      if (res) {
        this.appStatus = res; 
      }
    });

     
  }
  fetchReportData(e) {
    this.currentPage = e;
    this.getReport();
  }
  exportReport(){
    this.error = null;
    this.success = null;
   
    if(!this.candidate || !this.candidate.reporttype){
      this.error = "Please choose 'Report Type'";
      return;
    }
    if(!this.candidate || !this.candidate.exam || this.candidate.exam.length <1 ){
      this.error = "Please select 'Exam Name' ";
      return;
    }
    this.freitag = true;
    this.registrationReportService
    .exportReport(this.candidate)
    .pipe(first())
    .subscribe(res => {
      
      if(!res || res["status"] === "error"){
        this.error = res["error"];
        this.freitag = false;
        return;
      } else {
        this.success = "Report Uploaded Initiated. It will be available soon";
        this.freitag = false;
        return;
      }
    });
  }
}
