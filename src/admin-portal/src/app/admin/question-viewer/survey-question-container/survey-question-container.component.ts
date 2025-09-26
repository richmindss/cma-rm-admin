import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { SurveyQuestionsService } from "../../../shared/services/survey-questions/survey-questions.service"

import { first } from "rxjs/operators";
@Component({
  selector: 'app-survey-question-container',
  templateUrl: './survey-question-container.component.html',
  styleUrls: ['./survey-question-container.component.scss']
})
export class SurveyQuestionContainerComponent implements OnInit {

  @Input() qbid: any;
  @Input() questionId: any;

  question: any = {};
  isValidQuestionType: any = true;
  qTypes = ["OBQ", "MCQ", "MTP", "SUB", "CSQ"];

  constructor(
    private surveyQuestionsService: SurveyQuestionsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.qbid && this.questionId) {
      this.loadQuestion();
    }
  }

  loadQuestion() {
    this.surveyQuestionsService
      .getQuestionById(this.qbid, this.questionId)
      .pipe(first())
      .subscribe(res => {
        this.question = res;
        this.isValidQuestionType = this.isValidType();
      });
  }

  isValidType() {
    return this.qTypes.indexOf(this.question.question_type) >= 0;
  }
}
