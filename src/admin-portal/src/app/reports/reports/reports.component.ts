import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.sass"]
})
export class ReportsComponent implements OnInit {
  menuItems = [
    { name: "Candidate", target: "candidate" },
    { name: "Category Wise Candidate", target: "category" },
    { name: "Test City Wise Candidate", target: "testcity" },
    { name: "Payment Collection", target: "paymentcolle" },
    { name: "Payment", target: "payment" },
    { name: "Bulk Candidate Data Download", target: "bulk" }
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  menuClick(m) {
    this.router.navigate(['reports/' + m.target]);
  }
}
