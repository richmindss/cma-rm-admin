import { Component, OnInit } from "@angular/core";
import { ExamidGenrationService } from "../../shared/services/examid-genration/examid-genration.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-examid-defination",
  templateUrl: "./examid-defination.component.html",
  styleUrls: ["./examid-defination.component.scss"]
})
export class ExamidDefinationComponent implements OnInit {
  suffixvalue: string;
  prefixvalue: string;
  examidlength: string;
  userDefResult: any;
  type: string = "examwise";
  error: any;
  examid: any;

  private _success = new Subject<string>();
  private _error = new Subject<string>();

  //alerts
  errorMessage = null;
  successMessage = null;

  constructor(
    private examGenrationApi: ExamidGenrationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examid = params.get("id");
   
    if (this.examid) {
      this.getExamwisegenration(this.examid);
    }
  });
    this.initAlert();
  }

  getExamwisegenration(id) {
    this.examGenrationApi
      .getExamwisegenration(id)
      .pipe(first())
      .subscribe(res => {
        if (res["status"] === "error") {
          this.error = "Data not found, Please add.";
        } else if (res["_id"]) {
          this.userDefResult = res;
          this.suffixvalue = this.userDefResult.suffixvalue;
          this.prefixvalue = this.userDefResult.prefixvalue;
          this.examidlength = this.userDefResult.examidlength;
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

    this.examGenrationApi
      .saveExamwiseGenration(
        this.examid,
        this.type,
        this.examidlength,
        this.prefixvalue,
        this.suffixvalue
      )
      .pipe(first())
      .subscribe(res => {
        this._success.next("Details updated successfully..");
      });
  }

  onReset() {
    this.router.navigate(["admin/exam-list"]);
  }
}
