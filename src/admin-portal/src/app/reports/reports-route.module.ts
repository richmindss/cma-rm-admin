import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidateComponent } from "./candidate/candidate.component";
import { CategoryWiseCandComponent } from "./category-wise-cand/category-wise-cand.component";
import { TestCityWiseComponent } from "./test-city-wise/test-city-wise.component";
import { PaymentCollectionComponent } from "./payment-collection/payment-collection.component";
import { PaymentComponent } from "./payment/payment.component";
import { BulkCandDataDownComponent } from "./bulk-cand-data-down/bulk-cand-data-down.component";
import { ReportsComponent } from "./reports/reports.component";
import { FullLayoutComponent } from "../containers/full-layout/full-layout.component";
import { AuthguardService } from "src/app/shared";
import { ReportDownloadComponent } from "./report-download/report-download.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: ""
    },
    canActivate: [AuthguardService],
    component: FullLayoutComponent,
    children: [
      {
        path: "",
        data: {
          title: "Reports"
        },
        component: ReportsComponent
      },
      {
        path: "candidate",
        data: {
          title: "Candidate"
        },
        component: CandidateComponent
      },
      {
        path: "category",
        data: {
          title: "Category Wise Candidate"
        },
        component: CategoryWiseCandComponent
      },
      {
        path: "testcity",
        data: {
          title: "Test City Wise"
        },
        component: TestCityWiseComponent
      },
      {
        path: "paymentcolle",
        data: {
          title: "Payment Collection"
        },
        component: PaymentCollectionComponent
      },
      {
        path: "payment",
        data: {
          title: "Payment"
        },
        component: PaymentComponent
      },
      {
        path: "bulk",
        data: {
          title: "Bulk Cand Data Download"
        },
        component: BulkCandDataDownComponent
      },
      {
        path: "reportdownload",
        data: {
          title: "Report Download"
        },
        component: ReportDownloadComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRouteModule {}
