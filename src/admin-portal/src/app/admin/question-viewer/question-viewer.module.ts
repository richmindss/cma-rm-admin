import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QObjectiveComponent } from './q-objective/q-objective.component';
// import { QMultiChoiceComponent } from './q-multi-choice/q-multi-choice.component';
// import { QSubjectiveComponent } from './q-subjective/q-subjective.component';
// import { QMatchPairComponent } from './q-match-pair/q-match-pair.component';
//import { QImageComponent } from './q-image/q-image.component';
import { QContentComponent } from './q-content/q-content.component';
import { QRadioAnswerComponent } from './q-radio-answer/q-radio-answer.component';
// import { QCheckAnswerComponent } from './q-check-answer/q-check-answer.component';
import { QMainContainerComponent } from './q-main-container/q-main-container.component';
import { QMDashboardRouteModule } from './qb-route.module';
import { QQuestionContainerComponent } from './q-question-container/q-question-container.component';
// import { QCasetypeComponent } from './q-casetype/q-casetype.component';
// import { QPairAnswerComponent } from './q-pair-answer/q-pair-answer.component';
// import { QSubAnswerComponent } from './q-sub-answer/q-sub-answer.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
 import { QAlternateComponent } from './q-alternate/q-alternate.component';
 
// import { AllQuestionsComponent } from "./all-questions/all-questions.component";

@NgModule({

    declarations: [
         QMainContainerComponent, 
         QQuestionContainerComponent,
         QObjectiveComponent,
         QContentComponent,
         QRadioAnswerComponent,
         QAlternateComponent,
        // QImageComponent
         ],

  // declarations: [QObjectiveComponent, QMultiChoiceComponent, 
  //       QSubjectiveComponent, QMatchPairComponent, QImageComponent, 
  //       QContentComponent, QRadioAnswerComponent, QCheckAnswerComponent, 
  //        QMainContainerComponent, 
  //       QQuestionContainerComponent, QCasetypeComponent, QPairAnswerComponent, QSubAnswerComponent,  QAlternateComponent,AllQuestionsComponent],
  imports: [
    CommonModule,
    QMDashboardRouteModule,
    NgbPaginationModule
  ],
  exports: [
    QMainContainerComponent,
   
  ],
  entryComponents: [
    //AllQuestionsComponent
  ]
  // entryComponents: [
  //   AllQuestionsComponent
  // ]
})
export class QuestionViewerModule { }
