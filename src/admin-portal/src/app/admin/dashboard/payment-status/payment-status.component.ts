import { Component, OnInit, Input } from "@angular/core";
import { PaymentVerificationListService } from "../../../shared/services/payment-verification-list/payment-verification-list.service";
import { first } from "rxjs/operators";
declare var google:any;

@Component({
  selector: "app-payment-status",
  templateUrl: "./payment-status.component.html",
  styleUrls: ["./payment-status.component.scss"]
})
export class PaymentStatusComponent implements OnInit {
  chartData: any;

  paymentCompletedResult: any;
  paymentPendingResult: any;
  paymentVerifiedResult: any;
  paymentVerifiedRejected: any;
  

  @Input() chartContainer: any;
  @Input() chartOpts: any;
  title = "Payment Status";
  
  constructor(
    private paymentVerificationListService: PaymentVerificationListService
  ) {}

  ngOnInit() {
    this.getPaymentStatusList();
  }

  drawChart() {
    var data = new google.visualization.DataTable();

    var val = [
      ["Payment Completed", this.paymentCompletedResult],
      ["Payment Pending", this.paymentPendingResult],
      ["Payment Verified", this.paymentVerifiedResult],
      ["Payment Failed", this.paymentVerifiedRejected],
      
    ];
    data.addColumn("string", "Status");
    data.addColumn("number", "Count");
    data.addRows(val);
    // // Instantiate and draw the chart.
    var chart = new google.visualization.PieChart(
      document.getElementById(this.chartContainer)
    );
    chart.draw(data, null);
  }

  getPaymentStatusList() {
    this.paymentVerificationListService
      .getPaymentStatusList()
      .pipe(first())
      .subscribe(res => {
        this.chartData = res;
         
        const completed = this.chartData.find(item => item._id === 'payment_completed')?.count || 0;
          this.chartData = this.chartData.map(item => {
            if (item._id === 'payment_verified') {
              return { ...item, count: item.count + completed };
            }
            return item;
          });
         this.chartData = this.chartData.filter(item => item._id !== 'payment_completed');
        this.getPaymentStatus(this.chartData);
      
        google.charts.load("current", { packages: ["corechart"] });
        var self = this;
        google.charts.setOnLoadCallback(function() {
          self.drawChart();
        });
      });
  }

  getPaymentStatus(chartData) {
    // console.log(chartData);
    for (var i = 0; i < chartData.length; i++) {
      if (chartData[i]._id == "payment_completed") {
        this.paymentCompletedResult = chartData[i].count;
      }
      if (chartData[i]._id == "payment_pending") {
        this.paymentPendingResult = chartData[i].count;
      }
      if (chartData[i]._id == "payment_verified") {
        this.paymentVerifiedResult = chartData[i].count;
      }
      if (chartData[i]._id == "payment_failed") {
        this.paymentVerifiedRejected = chartData[i].count;
      }
    }
  }
}
