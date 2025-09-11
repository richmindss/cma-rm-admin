import { Component, OnInit, Input } from "@angular/core";
import { ReportsService } from "src/app/shared";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-data",
  templateUrl: "./list-data.component.html",
  styleUrls: ["./list-data.component.scss"]
})
export class ListDataComponent implements OnInit {
  @Input() listType: any;
  columns: any;
  data: any;
  latestReg: any = [];

  constructor(private reportsService: ReportsService,
      private route: Router
    ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.reportsService
      .getReport({ type: "list", name: this.listType })
      .pipe(first())
      .subscribe(res => {
        var cols = res["columns"];
        if (cols) {
          cols.sort(function(a, b) {
            if (a.sequence > b.sequence) {
              return 1;
            }
            if (a.sequence < b.sequence) {
              return -1;
            }
            return 0;
          });
        }
        this.columns = cols;

        this.data = res["data"];
      });
  }

  onClick (row){
    if (row.href){
      this.route.navigate ([row.href]);
    }
  }
}
