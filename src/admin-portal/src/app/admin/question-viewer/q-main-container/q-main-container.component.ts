import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QbUploadService,AuthenticationService } from "src/app/shared/services";
// import { ExcelService } from "src/app/shared/services/excel-service/excel.service";
import { first } from "rxjs/operators";
// import { LanguageService } from "src/app/shared/services/language/language.service";

@Component({
  selector: "app-q-main-container",
  templateUrl: "./q-main-container.component.html",
  styleUrls: ["./q-main-container.component.scss"]
})
export class QMainContainerComponent implements OnInit, OnChanges {
  @Input() qbid;
  questions: any = [];
  page = 1;         // Current page
  pageSize = 50;    // Items per page
  collectionSize = 0; // Total items
  qbprefix:string = "";
  obj:any;
  language: string | null = null;
  selectedLanguage:any;
  user:any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionBankService: QbUploadService,
    private authenticationService: AuthenticationService
    // private questionBankService: QuestionBankService,
    // private excelService: ExcelService,
    // private languageServiceApi: LanguageService,
  ) {}

  ngOnInit() {
   this.language = this.activatedRoute.snapshot.paramMap.get('language');
   this.loadQuestions(this.language);
   this.user = this.authenticationService.getUserDetails();
  }

  ngOnChanges() {
    if (this.qbid) {
     // this.loadQuestions();
    }
  }

  loadQuestions(language?: any) {
    //alert(language)
    this.questionBankService
      .getQuestions(language)
      .pipe(first())
      .subscribe(res => {
        if(res && res["status"]){
          this.questions = res["data"];
          this.collectionSize = this.questions.length;
        }else{
          alert(res["message"]);
        }
       
      });
  }

  getQuestions (){
    if (!this.questions){
      return [];
    }
    var ans:any = [];
    var start = (this.page -1) * this.pageSize ;
    var until = start + this.pageSize;
    
    for (var i=start; i<until && i<this.collectionSize; i++){
      ans.push (this.questions [i]);
    }
    
    return ans;
  }
   
  getNextPage (e){
    
    this.page = e;
  }

  getTotalPages (){
    return  Math.ceil (this.collectionSize /this.pageSize);
  }

generateQuestionBank(language:any) {
  try {
    console.log(this.qbprefix);
    if(!this.qbprefix){
       alert("Please Enter question id prefix");
       return;
    }
    
    this.questionBankService.downloadZip(language,this.qbprefix).pipe(first()).subscribe((blob: Blob) => {
      //console.log("📦 ZIP blob received:", blob.size);
      if(blob && blob.size<75){
       return alert("Firstly Select questions for QB generation");
      }


      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);

      link.href = url;
      link.download = "questions_bundle.zip";
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  } catch (e) {
    console.error("❌ Error downloading ZIP:", e);
  }
}


onLanguageChange(e:any){
  this.selectedLanguage = e.target.value;
  //alert(this.selectedLanguage)
  this.loadQuestions(this.selectedLanguage);
}

  onReviewQuestion(status: string, id: string,language:string) {

    if(!this.selectedLanguage && this.user.record.Role =="Reviewer"){
      alert("Please Select language to send all question to Editor")
      return
    }
    if(this.selectedLanguage && this.user.record.Role =="Reviewer"){
     language = this.selectedLanguage;
    }
     
      this.questionBankService.sentForReviewQuestion(status,id,language)
      .pipe(first())
      .subscribe(res => {
        if(res && res["status"] == true){
          console.log("language..........................",language);
          this.loadQuestions(language);
        }else{
          alert(res["message"]);
        }
    
      });
          
  } 
}
