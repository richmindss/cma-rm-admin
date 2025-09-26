import { Component, OnInit, Input, OnChanges } from "@angular/core";
// import { QuestionBankService } from "src/app/shared/services/question-bank/question-bank.service";
import { first } from "rxjs/operators";
// import { AllQuestionsComponent } from "../all-questions/all-questions.component";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-q-question-container",
  templateUrl: "./q-question-container.component.html",
  styleUrls: ["./q-question-container.component.scss"]
})
export class QQuestionContainerComponent implements OnInit, OnChanges {
  @Input() qbid: any;
  @Input() questionId: any;

  question: any = {};
  isValidQuestionType: any = true;
  qTypes = ["OBQ", "MCQ", "MTP", "SUB", "CSQ"];

  constructor(
    // private questionBankService: QuestionBankService,
    private modalService: NgbModal, 
    ) {}

  ngOnInit() {
     this.question = this.questionId;
  }

  ngOnChanges() {
    if (this.qbid && this.questionId) {
     // this.loadQuestion();
    }
  }

  // loadQuestion() {
  //   this.questionBankService
  //     .getQuestionById(this.qbid, this.questionId)
  //     .pipe(first())
  //     .subscribe(res => {
  //       this.question = res;
  //       this.isValidQuestionType = this.isValidType();
  //     });
  // }

  isValidType() {
    return this.qTypes.indexOf(this.question.question_type) >= 0;
  }

  getAllQuestions(question:any) {
    return true;
    alert("all q");
    // if(this.isDisconnected()){
    //   return;
    // }
    var opts: NgbModalOptions = {
      centered: true,
      size: "lg",
      windowClass:"xlModal",
      backdrop: "static",
      keyboard: false
    };

    // let modal = this.modalService.open(AllQuestionsComponent, opts);
    // modal.componentInstance.getAllQuestionById(question);
    // modal.result.then(res => {});
   
  }
}
