import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRouteModule } from "./admin-route.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { AppHeaderLogoComponent } from "./app-header-logo/app-header-logo.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ListDataComponent } from "./dashboard/list-data/list-data.component";
import { WidgetComponent } from "./dashboard/widget/widget.component";
import { UsersComponent } from "../admin/users/users.component";
import { UsersListComponent } from "../admin/users-list/users-list.component";
import { CandidateStatusCountComponent } from "./dashboard/candidate-status-count/candidate-status-count.component";
import {ChangePasswordComponent} from "../admin/change-password/change-password.component";
import { QbUploadComponent } from "../admin/qb-upload/qb-upload.component";
import { UserMapperComponent } from "../admin/user-mapper/user-mapper.component";
import { UsersMapperListComponent } from "../admin/user-mapper-list/user-mapper-list.component";
import { QbSummaryComponent } from "../admin/qb-summary/qb-summary.component";

@NgModule({
  declarations: [
    DashboardComponent,
    UsersListComponent,
    UsersComponent,
    AppHeaderComponent,
    AppHeaderLogoComponent,
    ListDataComponent,
    WidgetComponent,
    CandidateStatusCountComponent,
    ChangePasswordComponent,
    QbUploadComponent,
    UserMapperComponent,
    UsersMapperListComponent,
    QbSummaryComponent
  ],
  imports: [
    CommonModule,
    AdminRouteModule,
    SharedModule,
    FormsModule,
    NgbModule,
    BsDatepickerModule.forRoot()
  ],


})
export class AdminModule {}
