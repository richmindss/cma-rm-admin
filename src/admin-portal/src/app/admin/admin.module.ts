import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRouteModule } from "./admin-route.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";

import { ProfileComponent } from "./profile/profile.component";
import { PotralConfigurationComponent } from "../admin/potral-configuration/potral-configuration.component";
import { LanguageListComponent } from "../admin/language-list/language-list.component";
import { FormsModule } from "@angular/forms";
import { ExamDetailsComponent } from "../admin/exam-details/exam-details.component";
import { ImportantDatesComponent } from "../admin/important-dates/important-dates.component";
import { ImportantAnnouncementComponent } from "../admin/important-announcement/important-announcement.component";
import { HelplineDetailsComponent } from "../admin/helpline-details/helpline-details.component";
import { PortalLanguageComponent } from "../admin/portal-language/portal-language.component";
import { UserDefinitionComponent } from "../admin/user-definition/user-definition.component";
import { SecurityAuthenticationComponent } from "../admin/security-authentication/security-authentication.component";
import { EmailSettingComponent } from "../admin/email-setting/email-setting.component";
import { EmailSmsComponent } from "../admin/email-sms/email-sms.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { AppHeaderLogoComponent } from "./app-header-logo/app-header-logo.component";
import { EventConfigurationComponent } from "./event-configuration/event-configuration.component";
import { RegistrationConfigurationComponent } from "../admin/registration-configuration/registration-configuration.component";
import { LoginConfigurationComponent } from "../admin/login-configuration/login-configuration.component";
import { CandidateConfigurationComponent } from "../admin/candidate-configuration/candidate-configuration.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CandidateInstructionsComponent } from "../admin/candidate-instructions/candidate-instructions.component";
import { CategoryComponent } from "../admin/category/category.component";
import { ExamidGenrationComponent } from "../admin/examid-genration/examid-genration.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { ExamListDetailsComponent } from "./exam-list-details/exam-list-details.component";
import { CategoryListComponent } from "../admin/category-list/category-list.component";
import { ExamSelectionComponent } from "../admin/exam-selection/exam-selection.component";
import { TestCenterLocationComponent } from "./test-center-import/test-center-location/test-center-location.component";
import { ConstantConfigurationComponent } from "../admin/constant-configuration/constant-configuration.component";
import { AppTabSequenceComponent } from "../admin/app-tab-sequence/app-tab-sequence.component";
import { ExamidDefinationComponent } from "../admin/examid-defination/examid-defination.component";
import { ReportsModule } from "../reports/reports.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CandidateStatusComponent } from "./dashboard/candidate-status/candidate-status.component";
import { PaymentStatusComponent } from "./dashboard/payment-status/payment-status.component";
import { ListDataComponent } from "./dashboard/list-data/list-data.component";
import { WidgetComponent } from "./dashboard/widget/widget.component";
import { EducationDetailComponent } from "../admin/education-detail/education-detail.component";
import { EducationComponent } from "../admin/education/education.component";
import { ExamCostinfoDetailComponent } from "./exam-costinfo/exam-costinfo-detail/exam-costinfo-detail.component";
import { ExamCostinfoComponent } from "./exam-costinfo/exam-costinfo.component";
import { TemplateConfigurationComponent } from "../admin/template-configuration/template-configuration.component";
import { TemplateTabComponent } from "./template-configuration/template-tab/template-tab.component";
import { UsersComponent } from "../admin/users/users.component";
import { UsersListComponent } from "../admin/users-list/users-list.component";
import { JobsComponent } from "./jobs/jobs.component";
import { TestCenterImportComponent } from "../admin/test-center-import/test-center-import.component";
import { ApplicationConfigurationComponent } from "../admin/application-configuration/application-configuration.component";
import { RegistrationReportComponent } from "../admin/registration-report/registration-report.component";
import { ExportComponent } from "../admin/export/export.component";
import { CandidateStatusCountComponent } from "./dashboard/candidate-status-count/candidate-status-count.component";
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
import { HomeFaqComponent } from './home-faq/home-faq.component';
import { HomeContactComponent } from './home-contact/home-contact.component';
import { TemplateCssComponent } from './template-configuration/template-css/template-css.component';
import { TemplateDocTemplateComponent } from './template-configuration/template-doc-template/template-doc-template.component';
import { UploadCandidateResultComponent } from "../admin/upload-candidate-result/upload-candidate-result.component";

@NgModule({
  declarations: [
    DashboardComponent,
    EducationComponent,
    UsersListComponent,
    AppTabSequenceComponent,
    UsersComponent,
    ProfileComponent,
    LanguageListComponent,
    ExamDetailsComponent,
    ImportantDatesComponent,
    ImportantAnnouncementComponent,
    PotralConfigurationComponent,
    HelplineDetailsComponent,
    PortalLanguageComponent,
    UserDefinitionComponent,
    SecurityAuthenticationComponent,
    EmailSettingComponent,
    EmailSmsComponent,
    AppHeaderComponent,
    AppHeaderLogoComponent,
    EventConfigurationComponent,
    RegistrationConfigurationComponent,
    LoginConfigurationComponent,
    CandidateConfigurationComponent,
    CandidateInstructionsComponent,
    CategoryComponent,
    ExamidGenrationComponent,
    CandidateInstructionsComponent,
    ExamListComponent,
    ExamListDetailsComponent,
    CategoryListComponent,
    ExamSelectionComponent,
    TestCenterLocationComponent,
    ConstantConfigurationComponent,
    ExamidDefinationComponent,
    CandidateStatusComponent,
    PaymentStatusComponent,
    ListDataComponent,
    WidgetComponent,
    EducationDetailComponent,
    EducationComponent,
    ExamCostinfoDetailComponent,
    ExamCostinfoComponent,
    TemplateConfigurationComponent,
    TemplateTabComponent,
    JobsComponent,
    TestCenterImportComponent,
    ApplicationConfigurationComponent,
    RegistrationReportComponent,
    ExportComponent,
    CandidateStatusCountComponent,
    ApplicationVerificationListComponent,
    ApplicationVerificationViewComponent,
    ImportComponent,
    TestScheduleUploadComponent,
    PdfDownloadStatusComponent,
    CandidateListComponent,
    TestCenterImportListComponent,
    CandidateDetailsComponent,
    HallTicketGenerationComponent,
    UploadTestScheduleComponent,
    TestScheduleUploadDetailsComponent,
    HomeFaqComponent,
    HomeContactComponent,
    TemplateCssComponent,
    TemplateDocTemplateComponent,
    UploadCandidateResultComponent
  ],
  imports: [
    CommonModule,
    AdminRouteModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReportsModule,
    BsDatepickerModule.forRoot()
  ],


})
export class AdminModule {}
