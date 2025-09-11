import { Component, OnInit } from "@angular/core";
import { TestcenterService } from "../../shared/services/test-center/test-center.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";

@Component({
  selector: "app-test-center-import",
  templateUrl: "./test-center-import.component.html",
  styleUrls: ["./test-center-import.component.scss"]
})
export class TestCenterImportComponent implements OnInit {
  fileType: any =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  dataAvailable = false;
  dataCount: any;
  uploadType: any = "import";
  error: any;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  errorMessage = null;
  successMessage = null;
  testcenterdata: any;

  constructor(
    private testcenterService: TestcenterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initAlert();
    console.log("test");
  }

  ondocImport(e) {
    this.testcenterdata = e;
    if (this.testcenterdata.length > 0) {
      this.dataAvailable = true;
      this.dataCount = this.testcenterdata.length;
    } else {
      this._error.next("Data not found!!");
    }
  }

  initAlert() {
    this._success.subscribe(message => (this.successMessage = message));
    this._success
      .pipe(debounceTime(2000))
      .subscribe(() => (this.successMessage = null));

    this._error.subscribe(message => (this.errorMessage = message));
    this._error
      .pipe(debounceTime(2000))
      .subscribe(() => (this.errorMessage = null));
  }

  onConfirm() {
    this.testcenterService
      .saveImportTestcenter(this.testcenterdata)
      .pipe(first())
      .subscribe(res => {
        this.dataAvailable = false;
        this._success.next("Data Imported Successfully!!");
        this.router.navigate(["admin/test-center-location-import-list"]);
      });
  }

  ondocError(e) {
    this.error = e;
  }
}
