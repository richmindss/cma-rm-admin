import { Component, OnInit } from "@angular/core";
// import { TestsService } from "src/app/shared";
import { ActivatedRoute, Router } from "@angular/router";
import { QbUploadService } from "src/app/shared/services";
import { AlertService } from "../../shared/services/alert/alert.service";
import { first } from "rxjs/operators";
import { BackendService } from "../../shared/services/backend/backend.service";

@Component({
  selector: "app-qb-upload",
  templateUrl: "./qb-upload.component.html",
  styleUrls: ["./qb-upload.component.scss"]
})
export class QbUploadComponent implements OnInit {
  sender = "qb-upload";

  testId: any;
  exam: any = {};
  uploadError = "";

  qbdata: any = {
    lang: { id: "", code: "", name: "" },
    code: "",
    _id: "",
    testid: ""
  };
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
    // private TestsService: TestsService,
   private alertService: AlertService,
   private backendService:BackendService
  ) { }

  ngOnInit() {
    // this.activateRoute.paramMap.subscribe(p => {
    //   this.testId = p.get("testid");
    //   this.qbid = p.get("qbid");

    //   this.getExam();

    //   if (!this.isNew()) {
    //     this.getQuesBankById();
    //   }
    // });
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

  async uploadZip(e:any){
     this.isDisabled = true;
     if (!this.selectedFile) {
      this.responseMessage = "Please select a zip file first!";
      this.isDisabled = false;
      return;
    }else{
      this.responseMessage = "";
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);
  
      try{
      return this.backendService.post ('/uploadQb/save-qb' ,formData)
        .subscribe(res => {
        if (res["status"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
          if(res["status"] == true){
            alert("Question Bank Data successfully saved");
            this.alertService.show(this.sender,"Question Bank Data successfully saved");
            this.getQuestionSummary();
          }
        }
       
      });
     
      }catch(e){
        // if(e && e.status == 401){
        //  // this.auth.logout();
        // }
      }
   
  }
  viewAllQuestion(){
    this.router.navigate([
        "admin/question-bank/view"
    ]);
  }


  getQuestionSummary() {
    this.questionBankService
      .getQuestionSummary()
      .pipe(first())
      .subscribe(res => {
  
        if(res && res["status"] == true){
            this.qbsummarydata = res["data"];
        }else{
          alert(res["message"])
        }
       
      });
  }


  deleteQuestion (){
    this.isDisabledDel = true;
    this.questionBankService
    .deleteQuestionBank()
    .pipe(first())
    .subscribe(res => {
      if (res["status"] == false) {
        alert(res["message"]);
        this.alertService.err(this.sender, res["message"]);
        return;
      }else{
        if(res["status"] == true){
          alert("Question Bank Deleted successfully");
          this.alertService.show(this.sender,"Question Bank Deleted successfully");
          this.getQuestionSummary();
          this.isDisabledDel = false;
        }
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
