import { Component, OnInit } from "@angular/core";
import { UserDefinitionService } from "../../shared/services/user-definition/user-definition.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { AlertService } from "../../shared/services/alert/alert.service";
import { Router } from "@angular/router";
import { CoreService, AuthenticationService } from "src/app/shared/services";



@Component({
  selector: "app-user-definition",
  templateUrl: "./user-definition.component.html",
  styleUrls: ["./user-definition.component.scss"]
})
export class UserDefinitionComponent implements OnInit {
  suffixvalue: string;
  prefixvalue: string;
  useridlength;
  userDefResult: any;
  type: any;
  error: any;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  sender = "app-user-definition";

  //alerts
  errorMessage = null;
  successMessage = null;

  constructor(private userDefinitionApi: UserDefinitionService,
    private alertService: AlertService,
    private router: Router,
    private coreService: CoreService,


  ) { }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    console.log("charCode", charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validateUserIdLength(useridlength) {
    if (/^([0-9]).{0,1}$/.test(useridlength)) {
      return true;
    } else {
      return false;
    }
  }

  validateSuffixValue(suffixvalue) {
    if (/^([A0-Z9]).{0,1}$/.test(suffixvalue)) {
      return true;
    } else {
      return false;
    }
  }

  validatePrefixValue(prefixvalue) {
    if (/^([A0-Z9]).{0,1}$/.test(prefixvalue)) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.initAlert();
    this.getUserDefinition();
  }

  getUserDefinition() {
    this.userDefinitionApi
      .getUserDefinition()
      .pipe(first())
      .subscribe(res => {
        if (res && res[0]) {
          this.userDefResult = res[0];
          this.type = this.userDefResult.type;
          this.suffixvalue = this.userDefResult.suffixvalue;
          this.prefixvalue = this.userDefResult.prefixvalue;
          this.useridlength = this.userDefResult.useridlength;
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

  onSave() {
    this.error = null;
    if (!this.validateUserIdLength(this.useridlength)) {
      this.error = "Please Enter valid User Id ";
      return;
    }

    if (this.prefixvalue && this.suffixvalue) {
      if (
        this.suffixvalue.length + this.prefixvalue.length >=
        +this.useridlength
      ) {
        this.error =
          "Suffix value & Prefix value length should not exceed User ID length";
        return;
      }
    }

    this.userDefinitionApi
      .saveUserDefinition(
        this.type,
        this.useridlength,
        this.prefixvalue,
        this.suffixvalue
      )
      .pipe(first())
      .subscribe(res => {
        this.error = " ";
        if (this.useridlength == 0) {
          this.alertService.err(this.sender, "User Id Length cannot be blank or zero");
          return false;
        }
        if (res["status"] == "error") {
          this.alertService.err(this.sender, res["message"]);
          return;
        }
        this.alertService.show(this.sender, "User ID Defination Data saved");

        this.getUserDefinition();
      });
  }


  onReset() {
    this.useridlength = "";
    this.suffixvalue = "";
    this.prefixvalue = "";
  }



}
