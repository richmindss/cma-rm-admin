import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../shared";
import { debounceTime, first } from "rxjs/operators";
import { Subject } from "rxjs";
@Component({
  selector: "app-login-configuration",
  templateUrl: "./login-configuration.component.html",
  styleUrls: ["./login-configuration.component.scss"]
})
export class LoginConfigurationComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  private _success = new Subject<string>();
  //alerts
  errorMessage = null;
  successMessage = null;
  setting: any = {
    enabled: false,
    message:
      "Password should be of minimum 8 and maximum of 14 length.Password should contain both upper-case and lower-case letters (case sensitivity),Should contain one or more numerical digits,Should contain special characters, such as @, #, $",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$#])[A-Za-zd@$#].{8,15}$"
  };

  initAlert() {
    this._success.subscribe(message => (this.successMessage = message));
    this._success
      .pipe(debounceTime(2000))
      .subscribe(() => (this.successMessage = null));
  }

  ngOnInit() {
    this.initAlert();
    this.getSetting();
  }

  onSave() {
    this.settingsService
      .savePasswordSetting(this.setting)
      .pipe(first())
      .subscribe(res => {
        this._success.next("content saved..");
        this.getSetting();
      });
  }
  getSetting() {
    this.settingsService
      .getPasswordSetting()
      .pipe(first())
      .subscribe(res => {
        this.setting = res;
      });
  }
}
