import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FullLayoutComponent } from "../../containers/full-layout/full-layout.component";
import { AuthguardService } from "../../shared";
import { QMainContainerComponent } from './q-main-container/q-main-container.component';
// import { QbDashboardComponent } from "./qb-dashboard/qb-dashboard.component";
// import { QbUploadComponent } from "./qb-upload/qb-upload.component";
// import { ReviewStatusComponent } from "../../modules/question-bank/review-status/review-status.component";
// import { EncryptedZipComponent } from "../../modules/question-bank/encrypted-zip/encrypted-zip.component";
// import { QbViewComponent } from "../../modules/question-bank/qb-view/qb-view.component";
// import { QbLangCodeComponent } from "./qb-lang-code/qb-lang-code.component";

const routes: Routes = [
  {
    path: "view",
    data: {
      title: ""
    },
    canActivate: [AuthguardService],
    component: QMainContainerComponent,
    children: [
      // {
      //   path: "view",
      //   data: {
      //     title: "Dashboard Page"
      //   },
      //   component: QMainContainerComponent
      // },
      // {
      //   path: ":testid",
      //   component: QbViewComponent,
      //   children: [
      //     {
      //       path: ":qbid/upload",
      //       component: QbUploadComponent
      //     },
      //     {
      //       path: ":qbid/lang",
      //       component: QbLangCodeComponent
      //     },
      //     {
      //       path: ":qbid/review",
      //       component: ReviewStatusComponent
      //     },
      //     {
      //       path: ":qbid/encrypt",
      //       component: EncryptedZipComponent
      //     }
      //   ]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QMDashboardRouteModule {}
