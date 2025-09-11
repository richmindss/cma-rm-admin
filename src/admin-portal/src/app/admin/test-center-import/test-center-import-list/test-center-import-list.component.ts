import { Component, OnInit } from "@angular/core";
import { TestcenterService } from "../../../shared/services/test-center/test-center.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-test-center-import-list",
  templateUrl: "./test-center-import-list.component.html",
  styleUrls: ["./test-center-import-list.component.sass"]
})
export class TestCenterImportListComponent implements OnInit {
  filter: any = {
    key: ""
  };

  testcenterCount: any = 0;
  testcenter: any;
  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  examcenterCount = 0;
  doc: any;
  downloadurl = "";
  /** end pagination */

  constructor(
    private testcenterApi: TestcenterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchUploadTestCenterList();
  }

  uploadTestcenter() {
    this.router.navigate(["admin/test-center-location-import/new"]);
  }

  searchUploadTestCenterList() {
    this.testcenterApi
      .searchUploadTestCenterList(this.currentPage, this.pageSize, this.filter)
      .pipe(first())
      .subscribe(res => {
        this.testcenterCount = res["count"];
        this.testcenter = res["data"];
      });
  }

  fetchTestcenterData(e) {
    this.currentPage = e;
    this.searchUploadTestCenterList();
  }

  onAdd() {
    this.router.navigate(["admin/test-center-location/new"]);
  }

  onEdit(id) {
    this.router.navigate(["admin/test-center-location/" + id]);
  }
}
