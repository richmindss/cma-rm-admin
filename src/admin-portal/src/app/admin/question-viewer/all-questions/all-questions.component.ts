import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
//import { TestContextService } from "../../../shared/services/test-context/test-context.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
//import { QuestionBankService } from "src/app/shared";
import { first } from "rxjs/operators";
//import { QuestionBankService } from "src/app/shared/services/question-bank/question-bank.service";


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
    //private questionBankService: QuestionBankService,
    // private testContextApi: TestContextService
    ) { }

  ngOnInit() {
   
  }

  close() {
    this.activeModal.close();
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
  }

  updateQuestionBank(){
   
    // this.questionBankService
    // .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    // .pipe(first())
    // .subscribe(res => {
    //   this.data = res;
    //   if(this.data && this.data.message =="question updated successfully"){
    //       alert(this.data.message);
    //     // this.activeModal.close();
    //     // window.location.reload();
    //   }
    // });
  }

  updateAlternative1(){
    // this.questionBankService
    // .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    // .pipe(first())
    // .subscribe(res => {
    //   this.data = res;
    //   if(this.data && this.data.message =="alternative1 updated successfully"){
    //     alert(this.data.message);
    //   }
    // });
  }

  updateAlternative2(){
    // this.questionBankService
    // .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    // .pipe(first())
    // .subscribe(res => {
    //   this.data = res;
    //   if(this.data && this.data.message =="alternative2 updated successfully"){
    //     alert(this.data.message);
    //   }
    // });
  }

  updateAlternative3(){
    // this.questionBankService
    // .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    // .pipe(first())
    // .subscribe(res => {
    //   this.data = res;
    //   if(this.data && this.data.message =="alternative3 updated successfully"){
    //     alert(this.data.message);
    //   }
    // });
  }

  updateAlternative4(){
    // this.questionBankService
    // .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    // .pipe(first())
    // .subscribe(res => {
    //   this.data = res;
    //   if(this.data && this.data.message =="alternative4 updated successfully"){
    //     alert(this.data.message);
    //   }
    // });
  }
}
