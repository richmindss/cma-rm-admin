import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
//import { TestContextService } from "../../../shared/services/test-context/test-context.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
//import { QuestionBankService } from "src/app/shared";
import { first } from "rxjs/operators";
import { QbUploadService } from "src/app/shared/services";


@Component({
  selector: "app-all-questions",
  templateUrl: "./all-questions.component.html",
  styleUrls: ["./all-questions.component.scss"]
})
export class AllQuestionsComponent implements OnInit {
  @Input() content:any;  
  @Output() onContentChanged = new EventEmitter<any> ();
  tinyId = "contentTinymce"; 
  questionUpdate:any;
  type:any;
  questionData:any;
  data:any;
  alt1:string;
  alt2:string;
  alt3:string;
  alt4:string;
  constructor(private activeModal: NgbActiveModal,
    private questionBankService: QbUploadService,
    //private questionBankService: QuestionBankService,
    // private testContextApi: TestContextService
    ) { }

  ngOnInit() {
   
  }

  close() {
    this.activeModal.close();
     window.location.reload();
  }

  getAllQuestionById(question:any) {
  
    this.questionUpdate = question;
    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt1 = this.questionUpdate.alternative1.toString();
    }

    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt2 = this.questionUpdate.alternative2.toString();
    }
    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt3 = this.questionUpdate.alternative3.toString();
    }
    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt4 = this.questionUpdate.alternative4.toString();
    }
  }

  openForQuestion(e:any,type:any){
    this.questionData = e;
    this.type = type;
    console.log("questionData..................",this.questionData,"this.type.............",this.type);
  }

  updateQuestionBank(){
   
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
          alert("question updated successfully");
      }
    });
  }

  updateAlternative1(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative1 updated successfully");
      }
    });
  }

  updateAlternative2(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative2 updated successfully");
      }
    });
  }

  updateAlternative3(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative3 updated successfully");
      }
    });
  }

  updateAlternative4(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative4 updated successfully");
      }
    });
  }
}
