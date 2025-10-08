import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { QbUploadService,AuthenticationService } from "src/app/shared/services";
import { first } from "rxjs/operators";
import { AllQuestionsComponent } from "../all-questions/all-questions.component";
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
  user:any = {};
  isValidQuestionType: any = true;
  qTypes = ["OBQ", "MCQ", "MTP", "SUB", "CSQ"];
 selectedValues: string[] = [];

  constructor(
    private questionBankService: QbUploadService,
    private modalService: NgbModal, 
    private authenticationService: AuthenticationService
    ) {}

  ngOnInit() {
     this.question = this.questionId;
     this.user = this.authenticationService.getUserDetails();
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

  updateQuestions(question:any) {

    var opts: NgbModalOptions = {
      centered: true,
      size: "lg",
      windowClass:"xlModal",
      backdrop: "static",
      keyboard: false
    };

    let modal = this.modalService.open(AllQuestionsComponent, opts);
    modal.componentInstance.getAllQuestionById(question);
    modal.result.then(res => {});
   
  }

  onReviewQuestion(status: string, id: string) {

      this.questionBankService.sentForReviewQuestion(status,id,"")
       .pipe(first())
       .subscribe(res => {
        if(res && res["status"] == true){
          window.location.reload();
        }else{
          alert(res["message"]);
        }
     
      });
        
  } 

onSelectQb(event: any) {

  const value = event.target.value;
  const checkedVal = event.target.checked;

   this.questionBankService.questionSelection(value,checkedVal)
      .pipe(first())
      .subscribe(res => {
      if(res && res["status"] == true){
        //window.location.reload();
      }else{
        alert(res["message"]);
      }
    
  });

}
  
}
