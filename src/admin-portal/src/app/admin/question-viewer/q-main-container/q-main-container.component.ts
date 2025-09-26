import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QbUploadService } from "src/app/shared/services";
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionBankService: QbUploadService,
    // private questionBankService: QuestionBankService,
    // private excelService: ExcelService,
    // private languageServiceApi: LanguageService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
    });
   // this.getLanguages();
   this.loadQuestions();
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

  generateAsExcel(){
  //  if(!this.selectedLanguage){
  //   alert("First Select Language");
  //   return false;
  //  }
  //   this.questionBankService
  //   .generateAsExcel(this.selectedLanguage)
  //   .pipe(first())
  //   .subscribe(res => {
  //     this.obj = res;
  //     if(this.obj && this.obj.length>0){
  //     this.excelService.generateExcel(this.obj);
  //     }else{
  //       alert("QB Not Available in selected language");
  //     }
  //   });

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

}
