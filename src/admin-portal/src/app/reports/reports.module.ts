import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportsRouteModule } from "./reports-route.module";
import { ChartsComponent } from "./charts/charts.component";
import { CandidateComponent } from "./candidate/candidate.component";
import { CategoryWiseCandComponent } from "./category-wise-cand/category-wise-cand.component";
import { TestCityWiseComponent } from "./test-city-wise/test-city-wise.component";
import { PaymentCollectionComponent } from "./payment-collection/payment-collection.component";
import { PaymentComponent } from "./payment/payment.component";
import { BulkCandDataDownComponent } from "./bulk-cand-data-down/bulk-cand-data-down.component";
import { ReportsComponent } from "./reports/reports.component";
import { SharedModule } from "src/app/shared";
import { FormsModule } from '@angular/forms';
import { ReportsFilterComponent } from '../reports/reports-filter/reports-filter.component';
import { CandidateReportComponent } from './candidate/candidate-report/candidate-report.component';
import { PaymentFilterComponent } from './payment/payment-filter/payment-filter.component';
import { ReportDownloadComponent } from "./report-download/report-download.component";

@NgModule({
  declarations: [
    ChartsComponent,
    CandidateComponent,
    CategoryWiseCandComponent,
    TestCityWiseComponent,
    PaymentCollectionComponent,
    PaymentComponent,
    BulkCandDataDownComponent,
    ReportsComponent,
    ReportsFilterComponent,
    CandidateReportComponent,
    PaymentFilterComponent,
    ReportDownloadComponent

  ],
  imports: [
    CommonModule,
    ReportsRouteModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    ChartsComponent,
    CandidateComponent,
    CategoryWiseCandComponent,
    TestCityWiseComponent,
    PaymentCollectionComponent,
    PaymentComponent,
    BulkCandDataDownComponent,
    ReportsComponent,
    CandidateReportComponent,
    PaymentFilterComponent,
    ReportDownloadComponent
  ]
})
export class ReportsModule {}
