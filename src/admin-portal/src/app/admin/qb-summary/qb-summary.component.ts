import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QbUploadService } from "src/app/shared/services";
import { AlertService } from "../../shared/services/alert/alert.service";
import { first } from "rxjs/operators";
import { BackendService } from "../../shared/services/backend/backend.service";

@Component({
  selector: 'app-qb-summary',
  templateUrl: './qb-summary.component.html',
  styleUrls: ['./qb-summary.component.scss']
})
export class QbSummaryComponent implements OnInit {

sender = "qb-upload";

  testId: any;
  exam: any = {};
  uploadError = "";

  docid: any;
  qbid: any;
  isDisabled:boolean = false;
  isDisabledDel : boolean = false;
  summary: any = [];
  qbErrors: any = {
    questions: [],
    aggregate: []
  };

  selectedFile: File | null = null;
  responseMessage: string = '';
  qbsummarydata:any = [];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private questionBankService: QbUploadService,
    private alertService: AlertService,
    private backendService:BackendService
  ) { }

  ngOnInit() {
    this.getQuestionSummary();
  }

  isNew() {
    return this.qbid == "new";
  }

  ondocUploaded(e) {
    this.uploadError = "";
    this.docid = e.documentid;
    //this.getQuesBankById();
  }

  ondocError(e) {
  
    this.uploadError = "";
    if (e.status && e.status == "error"){
      this.uploadError = e.message;
    }else {
      this.uploadError = e;
    }
   
   
  }

   onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  viewAllQuestion(language:any){
    this.router.navigate(["admin/question-bank/view/",language]);
  }


  getQuestionSummary() {
    this.questionBankService
      .getAllQuestionSummary()
      .pipe(first())
      .subscribe(res => {
         
        if(res && res["status"] == true){
            this.qbsummarydata = res["data"];
        }else{
          alert(res["message"])
        }
       
      });
  }


  onCancel() {
    //this.location.back ();
    this.router.navigate(["/question-bank/"]);
  }

  compareFn(a, b) {
    if (a && b && a._id && b._id) {
      return a._id == b._id;
    }
    return false;
  }

  getTotalMarks() {
    var m = 0;
    for (var i = 0; i < this.qbsummarydata.length; i++) {
      m += this.qbsummarydata[i].count * this.qbsummarydata[i].marks;
    }

    return m;
  }

  getTotalQuestions() {
    var m = 0;
    for (var i = 0; i < this.qbsummarydata.length; i++) {
      m += this.qbsummarydata[i].count;
    }

    return m;
  }


  getQPaperError (paper){

    var err =  paper.filter (x => x.error);
    console.log ("in err", err);
    return err;

  }

}
