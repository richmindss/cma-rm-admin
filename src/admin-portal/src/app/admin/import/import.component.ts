import { Component, OnInit } from "@angular/core";
import { ImportService } from "../../shared/services/import/import.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { ConstantService } from "../../shared/services/constant/constant.service";

@Component({
  selector: "app-import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.scss"]
})
export class ImportComponent implements OnInit {
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
  importdata: any;
  importList: any;
  importCode: any;

  constructor(
    private importService: ImportService,
    private constantService: ConstantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getImportList();
    this.initAlert();
    this.importCode = "DISTRICT_IMPORT";
  }

  ondocImport(e) {
    this.importdata = e;
    if (this.importdata.length > 0) {
      this.dataAvailable = true;
      this.dataCount = this.importdata.length;
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
    if (this.importCode === "STATE_IMPORT") {
      this.importService
        .saveImportState(this.importdata)
        .pipe(first())
        .subscribe(res => {
          this.dataAvailable = false;
          this._success.next("Data Imported Successfully!!");
        });
    } else if (this.importCode === "DISTRICT_IMPORT") {
      this.importService
        .saveImportDistrict(this.importdata)
        .pipe(first())
        .subscribe(res => {
          this.dataAvailable = false;
          this._success.next("Data Imported Successfully!!");
        });
    }
  }

  ondocError(e) {
    this.error = e;
  }

  getImportList() {
    this.constantService
      .getConstantValue("IMPORTLIST")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.importList = res;
        }
      });
  }

  onChange(event: any) {
    this.importCode = event.target.value;
  }
}
