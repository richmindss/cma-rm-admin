import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { QbUploadService } from "src/app/shared/services";
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
  selectedValues: number[] = [];
  constructor(
    private questionBankService: QbUploadService,
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

  onReviewQuestion(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
      if (input.checked) {
       this.questionBankService.sentForReviewQuestion(id)
       .pipe(first())
       .subscribe(res => {
        if(res && res["status"] == true){

        }else{
          alert(res["message"]);
        }
     
      });
        
      } 
      
  }
}
