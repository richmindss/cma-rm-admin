import { Component, OnInit } from "@angular/core";
// import { TestsService } from "src/app/shared";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService,QbUploadService } from "src/app/shared/services";
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
  user:any = {};
  selectedFile: File | null = null;
  responseMessage: string = '';
  qbsummarydata:any = [];

  constructor(
   private router: Router,
   private activateRoute: ActivatedRoute,
   private questionBankService: QbUploadService,
   private authenticationService: AuthenticationService,
   private alertService: AlertService,
   private backendService:BackendService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.getUserDetails();
    this.getQuestionSummary();
  }

  isNew() {
    return this.qbid == "new";
  }

  ondocUploaded(e:any) {
    this.uploadError = "";
    this.docid = e.documentid;
    //this.getQuesBankById();
  }

  ondocError(e:any) {
  
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

  async uploadZip(event:any){
     this.isDisabled = true;
     if (!this.selectedFile) {
      this.responseMessage = "Please select a zip file first!";
      this.isDisabled = false;
      return;
    }else{
      this.responseMessage = "";
    }

      const isZip = this.selectedFile.type === 'application/zip' || this.selectedFile.name.toLowerCase().endsWith('.zip');
      if (!isZip) {
        alert("❌ Only ZIP files are allowed!");
        event.target.value = ''; // Reset file input
        return;
      }

      // ✅ 2. Check file size (20 KB to 5 MB)
      const fileSizeKB = this.selectedFile.size / 1024; // convert bytes to KB
      const minSize = 20; // KB
      const maxSize = 5 * 1024; // 5 MB = 5120 KB

      if (fileSizeKB < minSize || fileSizeKB > maxSize) {
        alert("⚠️ File size must be between 20 KB and 5 MB!");
        event.target.value = ''; // Reset file input
        return;
      }

    const formData = new FormData();
    formData.append("file", this.selectedFile);
  
      try{
      return this.backendService.post ('/uploadQb/save-qb' ,formData)
        .subscribe(res => {
          //this.isDisabledDel = true;
           this.isDisabled = false;
           this.selectedFile = null;
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
  
  viewAllQuestion(language:any){
    console.log(this.user)
    if(this.user.record.Role=="Author"){
      this.router.navigate(["admin/question-bank/view/",language]);
    }else{
      this.router.navigate(["admin/question-bank/view"]);
    }
   
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


  deleteQuestion (language:any){
    this.isDisabledDel = true;
    this.questionBankService
    .deleteQuestionBank(language)
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
