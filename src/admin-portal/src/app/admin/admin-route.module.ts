import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FullLayoutComponent } from "../containers/full-layout/full-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthguardService } from "../shared";
import { AppHeaderComponent } from "../admin/app-header/app-header.component";
import { UsersComponent } from "./users/users.component";
import { UsersListComponent } from "./users-list/users-list.component";
import {ChangePasswordComponent} from "../admin/change-password/change-password.component";
import { QbUploadComponent } from "../admin/qb-upload/qb-upload.component";
import { UserMapperComponent } from "../admin/user-mapper/user-mapper.component";
import { UsersMapperListComponent } from "../admin/user-mapper-list/user-mapper-list.component";
import { QbSummaryComponent } from "../admin/qb-summary/qb-summary.component";
import { TopicMasterComponent } from "../admin/topic-master/topic-master.component";
import { ExamMasterComponent } from "../admin/exam-master/exam-master.component"

const routes: Routes = [
  {
    path: "admin",
    data: {
      title: ""
    },
    canActivate: [AuthguardService],
    component: FullLayoutComponent,
    children: [
      {
        path: "",
        data: {
          title: "Dashboard Page"
        },
        component: DashboardComponent
      },
      {
        path: "dashboard",
        data: {
          title: "Dashboard"
        },
        component: DashboardComponent
      },
      {
        path: 'question-bank',
        loadChildren: () => import('./question-viewer/question-viewer.module').then(m => m.QuestionViewerModule)
      },
      {
        path: "app-header",
        data: {
          title: "Application Header"
        },
        component: AppHeaderComponent
      },

      {
        path: "user/:id",
        data: {
          title: "User Detail"
        },
        component: UsersComponent
      },
      {
        path: "users",
        data: {
          title: "Users"
        },
        component: UsersListComponent
      },
      {
        path: "user-mapper/:id",
        data: {
          title: "User Mapper"
        },
        component: UserMapperComponent
      },

      {
        path: "user-mapper-list",
        data: {
          title: "User Mapper List"
        },
        component: UsersMapperListComponent
      },
  
      {
        path: "change-password",
        data: {
          title: "change-password"
        },
        component: ChangePasswordComponent
      },
      {
        path: "qb-upload",
        data: {
          title: "question-bank-upload"
        },
        component: QbUploadComponent
      },

      {
        path: "qb-summary",
        data: {
          title: "question-bank-summary"
        },
        component: QbSummaryComponent
      },

      {
      path: "topic-master",
      data: {
        title: "topic-master"
      },
      component: TopicMasterComponent
      },

      {
      path: "exam-master",
      data: {
        title: "exam-master"
      },
      component: ExamMasterComponent
    },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouteModule { }
