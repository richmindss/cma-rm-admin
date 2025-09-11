import { Component, OnInit } from "@angular/core";
import { EmailSettingService } from "../../shared/services/email-setting/email-setting.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";

@Component({
  selector: "app-email-setting",
  templateUrl: "./email-setting.component.html",
  styleUrls: ["./email-setting.component.scss"]
})
export class EmailSettingComponent implements OnInit {
  name: string;
  description: string;
  hostname: string;
  port: string;
  enable: boolean;
  toemail: string;
  fromemail: string;
  username: string;
  password: string;
  emailResult: any;
  isSave: boolean = false;
  private _success = new Subject<string>();
  private _error = new Subject<string>();

  //alerts
  errorMessage = null;
  successMessage = null;

  constructor(private emailSettingApi: EmailSettingService) {}

  ngOnInit() {
    this.initAlert();
    this.getEmailSetting();
  }

  getEmailSetting() {
    this.emailSettingApi
      .getEmailSetting()
      .pipe(first())
      .subscribe(res => {
        if (res && res[0]) {
          this.emailResult = res[0];
          this.name = this.emailResult.name;
          this.description = this.emailResult.description;
          this.hostname = this.emailResult.hostname;
          this.port = this.emailResult.port;
          this.enable = this.emailResult.enable;
          this.fromemail = this.emailResult.fromemail;
          this.username = this.emailResult.username;
          this.password = this.emailResult.password;
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
    this.emailSettingApi
      .saveEmailSetting(
        this.name,
        this.description,
        this.hostname,
        this.port,
        this.enable,
        this.fromemail,
        this.username,
        this.password
      )
      .subscribe(res => {
        this._success.next("content saved..");
      });
  }

  onTestConnection() {
    // need to write api

    this.emailSettingApi
      .checkTestConnection(this.toemail)
      .pipe(first())
      .subscribe(res => {
        this._success.next("Connection successful..");
      });
  }
}
