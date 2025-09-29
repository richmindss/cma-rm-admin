import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FullLayoutComponent } from "../containers/full-layout/full-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthguardService } from "../shared";
import { ImportantDatesComponent } from "../admin/important-dates/important-dates.component";
import { ImportantAnnouncementComponent } from "../admin/important-announcement/important-announcement.component";
import { HelplineDetailsComponent } from "../admin/helpline-details/helpline-details.component";
import { SecurityAuthenticationComponent } from "../admin/security-authentication/security-authentication.component";
import { AppHeaderComponent } from "../admin/app-header/app-header.component";
import { EventConfigurationComponent } from "./event-configuration/event-configuration.component";
import { RegistrationConfigurationComponent } from "../admin/registration-configuration/registration-configuration.component";
import { UsersComponent } from "./users/users.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { ApplicationConfigurationComponent } from "../admin/application-configuration/application-configuration.component";
import { RegistrationReportComponent } from "../admin/registration-report/registration-report.component";
import { ExportComponent } from "../admin/export/export.component";
import { ImportComponent } from "../admin/import/import.component";
import { HomeContactComponent } from './home-contact/home-contact.component';
import { HomeFaqComponent } from './home-faq/home-faq.component';
import {ChangePasswordComponent} from "../admin/change-password/change-password.component";
import { QbUploadComponent } from "../admin/qb-upload/qb-upload.component";

import { UserMapperComponent } from "../admin/user-mapper/user-mapper.component";
import { UsersMapperListComponent } from "../admin/user-mapper-list/user-mapper-list.component";

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
        path: "important-dates",
        data: {
          title: "Important Dates"
        },
        component: ImportantDatesComponent
      },

      {
        path: "important-announcement",
        data: {
          title: "Important Announcements "
        },
        component: ImportantAnnouncementComponent
      },

      {
        path: "helpline-details",
        data: {
          title: "Helpline Details"
        },
        component: HelplineDetailsComponent
      },
      {
        path: "faq",
        component: HomeFaqComponent
      },
      {
        path: "contact",
        component: HomeContactComponent
      },
      {
        path: "security-authentication",
        component: SecurityAuthenticationComponent
      },
      {
        path: "app-header",
        data: {
          title: "Application Header"
        },
        component: AppHeaderComponent
      },
      {
        path: "event-configuration",
        data: {
          title: "Event Configuration"
        },
        component: EventConfigurationComponent
      },
      {
        path: "registration-configuration",
        data: {
          title: "Registration Configuration"
        },
        component: RegistrationConfigurationComponent
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
        path: "user-mapper",
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
        path: "application-configuration",
        data: {
          title: "Application Configuration"
        },
        component: ApplicationConfigurationComponent
      },
      {
        path: "registration-report",
        data: {
          title: "Registartion Report"
        },
        component: RegistrationReportComponent
      },
      {
        path: "export",
        data: {
          title: "Export"
        },
        component: ExportComponent
      },

      {
        path: "import",
        data: {
          title: "Import"
        },
        component: ImportComponent
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

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouteModule { }
