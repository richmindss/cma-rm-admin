import { Component, OnInit } from "@angular/core";
import { ExamidGenrationService } from "../../shared/services/examid-genration/examid-genration.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";

@Component({
  selector: "app-examid-genration",
  templateUrl: "./examid-genration.component.html",
  styleUrls: ["./examid-genration.component.scss"]
})
export class ExamidGenrationComponent implements OnInit {
  suffixvalue: string;
  prefixvalue: string;
  examidlength: string;
  userDefResult: any;
  type: any;
  error: any;
  private _success = new Subject<string>();
  private _error = new Subject<string>();

  //alerts
  errorMessage = null;
  successMessage = null;

  constructor(private examGenrationApi: ExamidGenrationService) {}

  ngOnInit() {
    this.initAlert();
    this.getExamgenration();
  }

  getExamgenration() {
    this.examGenrationApi
      .getExamgenration()
      .pipe(first())
      .subscribe(res => {
        if (res && res[0]) {
          this.userDefResult = res[0];
          this.type = this.userDefResult.type;
          this.suffixvalue = this.userDefResult.suffixvalue;
          this.prefixvalue = this.userDefResult.prefixvalue;
          this.examidlength = this.userDefResult.examidlength;
        } else {
          this.type = "overall";
        }
      });
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

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isSpec(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)) {
      return true;
    }
    return false;
  }

  onSave() {
    this.error = null;
    if (this.type === "overall") {
      if (!this.examidlength || this.examidlength == "0") {
        this.error = "Please Enter valid Exam Id length ";
        return;
      }

      if (this.prefixvalue && this.suffixvalue) {
        if (
          this.suffixvalue.length + this.prefixvalue.length >=
          +this.examidlength
        ) {
          this.error =
            "Suffix value & Prefix value length should not exceed Exam ID length";
          return;
        }
      }

      if (!this.prefixvalue && this.suffixvalue) {
        if (this.suffixvalue.length >= +this.examidlength) {
          this.error = "Suffix value length should not exceed Exam ID length";
          return;
        }
      }

      if (this.prefixvalue && !this.suffixvalue) {
        if (this.prefixvalue.length >= +this.examidlength) {
          this.error = "Prefix value length should not exceed Exam ID length";
          return;
        }
      }
    } else if (this.type === "examwise") {
      if (this.examidlength) {
        this.examidlength = "";
      }
      if (this.suffixvalue) {
        this.suffixvalue = "";
      }
      if (this.prefixvalue) {
        this.prefixvalue = "";
      }
    }

    this.examGenrationApi
      .saveExamGenration(
        this.type,
        this.examidlength,
        this.prefixvalue,
        this.suffixvalue
      )
      .pipe(first())
      .subscribe(res => {
        this._success.next("Details updated successfully..");
        this.getExamgenration();
      });
  }
}
