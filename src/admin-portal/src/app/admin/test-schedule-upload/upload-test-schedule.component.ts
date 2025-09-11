import { Component, OnInit } from "@angular/core";
import { TestscheduleService } from "../../shared/services/test-schedule/test-schedule.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { Router } from "@angular/router";
import { AlertService } from "../../shared/services/alert/alert.service";


@Component({
  selector: "app-upload-test-schedule",
  templateUrl: "./upload-test-schedule.component.html",
  styleUrls: ["./upload-test-schedule.component.scss"]
})
export class UploadTestScheduleComponent implements OnInit {
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
  testscheduledata: any;
  errorCount = 0;
  constructor(
    private testscheduleService: TestscheduleService,
    private router: Router,
    private alertService: AlertService


  ) { }
  sender = "upload-test-schedule";

  ngOnInit() {
    this.initAlert();
  }

  ondocImport(e) {
    this.testscheduledata = e;
    if (this.testscheduledata.length > 0) {
      this.dataAvailable = true;
      this.dataCount = this.testscheduledata.length;
      this.errorCount = 0;
      for (var i = 0; i<this.testscheduledata.length; i++){
        this.errorCount += this.testscheduledata[i].error? 1: 0;
      }
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
    this.testscheduleService
      .saveTestschedule(this.testscheduledata)
      .pipe(first())
      .subscribe(res => {
        this.dataAvailable = false;
        if (res["status"] == "error") {
          this.alertService.err(this.sender, res["message"]);
          return;
        }
        this.alertService.show(this.sender, "csrc Data Saved");
        this.router.navigate(["admin/test-schedule-upload"]);

      });
  }

  ondocError(e) {
    this.error = e;
  }
}
