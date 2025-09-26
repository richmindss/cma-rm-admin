import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SurveyQuestionsService } from "../../../shared/services/survey-questions/survey-questions.service"
import { first } from "rxjs/operators";

@Component({
  selector: 'app-survey-question-main-container',
  templateUrl: './survey-question-main-container.component.html',
  styleUrls: ['./survey-question-main-container.component.scss']
})
export class SurveyQuestionMainContainerComponent implements OnInit {

  @Input() qbid;

  questions: any = [];
  constructor(
    private surveyQuestionsService: SurveyQuestionsService

  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.qbid) {
      this.loadQuestions();
    }
  }

  loadQuestions() {
    this.surveyQuestionsService
      .getQuestions(this.qbid)
      .pipe(first())
      .subscribe(res => {
        this.questions = res;
      });
  }


}
