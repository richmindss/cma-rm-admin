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

  obj:any;
  languages: any = [];
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
    this.activatedRoute.paramMap.subscribe(p => {
    });
   // this.getLanguages();
   this.loadQuestions();
   this.user = this.authenticationService.getUserDetails();
  }

  ngOnChanges() {
    if (this.qbid) {
     // this.loadQuestions();
    }
  }

  loadQuestions() {
    this.questionBankService
      .getQuestions()
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

generateQuestionBank() {
  try {
    this.questionBankService.downloadZip().pipe(first()).subscribe((blob: Blob) => {
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

 getLanguages() {
  // this.languageServiceApi
  //   .getLanguage()
  //   .pipe(first())
  //   .subscribe(res => {
  //     this.languages = res;
  //   });
}
onLanguageChange(e:any){
  this.selectedLanguage = e.target.value;
}

  onReviewQuestion(status: string, id: string) {
      // const input = event.target as HTMLInputElement;
      //   if (input.checked) {
        this.questionBankService.sentForReviewQuestion(status,id)
        .pipe(first())
        .subscribe(res => {
          if(res && res["status"] == true){
           this.loadQuestions();
          }else{
            alert(res["message"]);
          }
      
        });
          
        } 
        
  //}

}
