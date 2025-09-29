import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRouteModule } from "./admin-route.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ImportantDatesComponent } from "../admin/important-dates/important-dates.component";
import { ImportantAnnouncementComponent } from "../admin/important-announcement/important-announcement.component";
import { HelplineDetailsComponent } from "../admin/helpline-details/helpline-details.component";
import { SecurityAuthenticationComponent } from "../admin/security-authentication/security-authentication.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { AppHeaderLogoComponent } from "./app-header-logo/app-header-logo.component";
import { EventConfigurationComponent } from "./event-configuration/event-configuration.component";
import { RegistrationConfigurationComponent } from "../admin/registration-configuration/registration-configuration.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReportsModule } from "../reports/reports.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CandidateStatusComponent } from "./dashboard/candidate-status/candidate-status.component";
import { PaymentStatusComponent } from "./dashboard/payment-status/payment-status.component";
import { ListDataComponent } from "./dashboard/list-data/list-data.component";
import { WidgetComponent } from "./dashboard/widget/widget.component";
import { UsersComponent } from "../admin/users/users.component";
import { UsersListComponent } from "../admin/users-list/users-list.component";
import { ApplicationConfigurationComponent } from "../admin/application-configuration/application-configuration.component";
import { RegistrationReportComponent } from "../admin/registration-report/registration-report.component";
import { ExportComponent } from "../admin/export/export.component";
import { CandidateStatusCountComponent } from "./dashboard/candidate-status-count/candidate-status-count.component";
import { ImportComponent } from "../admin/import/import.component";
import { HomeFaqComponent } from './home-faq/home-faq.component';
import { HomeContactComponent } from './home-contact/home-contact.component';
import {ChangePasswordComponent} from "../admin/change-password/change-password.component";
import { QbUploadComponent } from "../admin/qb-upload/qb-upload.component";

import { UserMapperComponent } from "../admin/user-mapper/user-mapper.component";
import { UsersMapperListComponent } from "../admin/user-mapper-list/user-mapper-list.component";

@NgModule({
  declarations: [
    DashboardComponent,
    UsersListComponent,
    UsersComponent,
    ImportantDatesComponent,
    ImportantAnnouncementComponent,
    HelplineDetailsComponent,
    SecurityAuthenticationComponent,
    AppHeaderComponent,
    AppHeaderLogoComponent,
    EventConfigurationComponent,
    RegistrationConfigurationComponent,
    CandidateStatusComponent,
    PaymentStatusComponent,
    ListDataComponent,
    WidgetComponent,
    ApplicationConfigurationComponent,
    RegistrationReportComponent,
    ExportComponent,
    CandidateStatusCountComponent,
    ImportComponent,
    HomeFaqComponent,
    HomeContactComponent,
    ChangePasswordComponent,
    QbUploadComponent,
    UserMapperComponent,
    UsersMapperListComponent
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
