import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FullLayoutComponent } from "../containers/full-layout/full-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthguardService } from "../shared";
import { LanguageListComponent } from "./language-list/language-list.component";
import { ExamDetailsComponent } from "../admin/exam-details/exam-details.component";
import { ImportantDatesComponent } from "../admin/important-dates/important-dates.component";
import { ImportantAnnouncementComponent } from "../admin/important-announcement/important-announcement.component";
import { HelplineDetailsComponent } from "../admin/helpline-details/helpline-details.component";
import { PortalLanguageComponent } from "../admin/portal-language/portal-language.component";
import { UserDefinitionComponent } from "../admin/user-definition/user-definition.component";
import { SecurityAuthenticationComponent } from "../admin/security-authentication/security-authentication.component";
import { EmailSettingComponent } from "../admin/email-setting/email-setting.component";
import { EmailSmsComponent } from "../admin/email-sms/email-sms.component";
import { AppHeaderComponent } from "../admin/app-header/app-header.component";
import { EventConfigurationComponent } from "./event-configuration/event-configuration.component";
import { RegistrationConfigurationComponent } from "../admin/registration-configuration/registration-configuration.component";
import { LoginConfigurationComponent } from "../admin/login-configuration/login-configuration.component";
import { CandidateConfigurationComponent } from "../admin/candidate-configuration/candidate-configuration.component";
import { ExamidGenrationComponent } from "../admin/examid-genration/examid-genration.component";
import { CandidateInstructionsComponent } from "../admin/candidate-instructions/candidate-instructions.component";
import { CategoryComponent } from "../admin/category/category.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { ExamListDetailsComponent } from "./exam-list-details/exam-list-details.component";
import { CategoryListComponent } from "../admin/category-list/category-list.component";
import { ExamSelectionComponent } from "../admin/exam-selection/exam-selection.component";
import { TestCenterLocationComponent } from "./test-center-import/test-center-location/test-center-location.component";
import { ConstantConfigurationComponent } from "../admin/constant-configuration/constant-configuration.component";
import { AppTabSequenceComponent } from "../admin/app-tab-sequence/app-tab-sequence.component";
import { EducationDetailComponent } from "../admin/education-detail/education-detail.component";
import { EducationComponent } from "../admin/education/education.component";
import { ExamCostinfoDetailComponent } from "./exam-costinfo/exam-costinfo-detail/exam-costinfo-detail.component";
import { ExamCostinfoComponent } from "./exam-costinfo/exam-costinfo.component";
import { TemplateConfigurationComponent } from "../admin/template-configuration/template-configuration.component";
import { UsersComponent } from "./users/users.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { JobsComponent } from "./jobs/jobs.component";
import { TestCenterImportComponent } from "./test-center-import/test-center-import.component";
import { ApplicationConfigurationComponent } from "../admin/application-configuration/application-configuration.component";
import { RegistrationReportComponent } from "../admin/registration-report/registration-report.component";
import { ExportComponent } from "../admin/export/export.component";
import { ApplicationVerificationListComponent } from "../admin/application-verification-list/application-verification-list.component";
import { ApplicationVerificationViewComponent } from "../admin/application-verification-view/application-verification-view.component";
import { ImportComponent } from "../admin/import/import.component";
import { TestScheduleUploadComponent } from "../admin/test-schedule-upload/test-schedule-upload.component";
import { PdfDownloadStatusComponent } from "../admin/pdf-download-status/pdf-download-status.component";
import { CandidateListComponent } from "../admin/candidate-list/candidate-list.component";
import { TestCenterImportListComponent } from "./test-center-import/test-center-import-list/test-center-import-list.component";
import { CandidateDetailsComponent } from "./candidate-list/candidate-details/candidate-details.component";
import { HallTicketGenerationComponent } from "./hall-ticket-generation/hall-ticket-generation.component";
import { UploadTestScheduleComponent } from './test-schedule-upload/upload-test-schedule.component';
import { TestScheduleUploadDetailsComponent } from './test-schedule-upload/test-schedule-upload-details/test-schedule-upload-details.component';
import { HomeContactComponent } from './home-contact/home-contact.component';
import { HomeFaqComponent } from './home-faq/home-faq.component';
import { UploadCandidateResultComponent } from "../admin/upload-candidate-result/upload-candidate-result.component";

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
        path: "profile",
        data: {
          title: "Profile"
        },
        component: ProfileComponent
      },

      {
        path: "language",
        data: {
          title: "Language"
        },
        component: LanguageListComponent
      },

      {
        path: "exam-details",
        data: {
          title: "Exam Details"
        },
        component: ExamDetailsComponent
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
        path: "portal-language",
        component: PortalLanguageComponent
      },
      {
        path: "user-definition",
        component: UserDefinitionComponent
      },

      {
        path: "security-authentication",
        component: SecurityAuthenticationComponent
      },
      {
        path: "email-setting",
        data: {
          title: "Email Setting"
        },
        component: EmailSettingComponent
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
        path: "email-sms/:id",
        data: {
          title: "Email-SMS-config"
        },
        component: EmailSmsComponent
      },
      {
        path: "registration-configuration",
        data: {
          title: "Registration Configuration"
        },
        component: RegistrationConfigurationComponent
      },

      {
        path: "login-configuration",
        data: {
          title: "Login Configuration"
        },
        component: LoginConfigurationComponent
      },

      {
        path: "candidate-configuration",
        data: {
          title: "Candidate Configuration"
        },
        component: CandidateConfigurationComponent
      },

      {
        path: "examid-generation",
        data: {
          title: "Examid Genration"
        },
        component: ExamidGenrationComponent
      },

      {
        path: "candidate-instructions",
        data: {
          title: "Candidate Instructions"
        },
        component: CandidateInstructionsComponent
      },

      {
        path: "category/:id",
        data: {
          title: "Category"
        },
        component: CategoryComponent
      },

      {
        path: "exam-list",
        data: {
          title: "Exam List"
        },
        component: ExamListComponent
      },

      {
        path: "exam/:id",
        data: {
          title: "Add-Exam"
        },
        component: ExamListDetailsComponent
      },
      {
        path: "category-list",
        data: {
          title: "Category list"
        },
        component: CategoryListComponent
      },
      {
        path: "test-center-location/:id",
        data: {
          title: "Test center location"
        },
        component: TestCenterLocationComponent
      },

      {
        path: "exam-selection",
        data: {
          title: "Exam Selection"
        },
        component: ExamSelectionComponent
      },
      {
        path: "constant-configuration",
        data: {
          title: "Constant Configuration"
        },
        component: ConstantConfigurationComponent
      },
      {
        path: "app-tab-sequence",
        data: {
          title: "App Tab Sequence"
        },
        component: AppTabSequenceComponent
      },

      {
        path: "test-center-location-import/:id",
        data: {
          title: "Import Test center location"
        },
        component: TestCenterImportComponent
      },

      {
        path: "test-center-location-import-list",
        data: {
          title: "Import Test center location"
        },
        component: TestCenterImportListComponent
      },

      {
        path: "education-detail",
        data: {
          title: "Education Detail"
        },
        component: EducationDetailComponent
      },

      {
        path: "education/:id",
        data: {
          title: "Education"
        },
        component: EducationComponent
      },
      {
        path: "exam-costinfo/:examid/cost/:id/type/:feeType",
        data: {
          title: "Add-Exam-CostInfo"
        },
        component: ExamCostinfoDetailComponent
      },
      {
        path: "exam-costinfo-list",
        data: {
          title: "Exam-CostInfo-List"
        },
        component: ExamCostinfoComponent
      },

      {
        path: "template-configuration",
        data: {
          title: "Template Configuration"
        },
        component: TemplateConfigurationComponent
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
        path: "jobs",
        data: {
          title: "jobs"
        },
        component: JobsComponent
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
        path: "application-verification-list",
        data: {
          title: "Application Verification List"
        },
        component: ApplicationVerificationListComponent
      },
      {
        path: "application-verification-view/:userid",
        data: {
          title: "Application Verification View"
        },
        component: ApplicationVerificationViewComponent
      },
      {
        path: "application-verification-view/:userid/:examid",
        data: {
          title: "Application Verification View"
        },
        component: ApplicationVerificationViewComponent
      },
      {
        path: "import",
        data: {
          title: "Import"
        },
        component: ImportComponent
      },
      {
        path: "test-schedule-upload",
        data: {
          title: "test-schedule-upload"
        },
        component: TestScheduleUploadComponent
      },
      {
        path: "pdf-download-status",
        data: {
          title: "pdf-download-status"
        },
        component: PdfDownloadStatusComponent
      },
      {
        path: "payments",
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
      },
      {
        path: "candidate-list",
        data: {
          title: "candidate-list"
        },
        component: CandidateListComponent
      },
      {
        path: "candidate-details/:id",
        data: {
          title: "Candidate Details"
        },
        component: CandidateDetailsComponent
      },
      {
        path: "hall-ticket-generation",
        data: {
          title: "Hall Ticket Generation"
        },
        component: HallTicketGenerationComponent
      },
      {
        path: "upload-test-schedule",
        data: {
          title: "upload-test-schedule"
        },
        component: UploadTestScheduleComponent,
      },
      {
        path: "test-schedule-upload-details/:id",
        data: {
          title: "test-schedule-upload-details"
        },
        component: TestScheduleUploadDetailsComponent
      },
      {
        path: "uploadCandidateResult",
        data: {
          title: "upload-candidate-result"
        },
        component: UploadCandidateResultComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouteModule { }
