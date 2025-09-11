import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../shared";
import { debounceTime, first } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-exam-selection",
  templateUrl: "./exam-selection.component.html",
  styleUrls: ["./exam-selection.component.scss"]
})
export class ExamSelectionComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  private _success = new Subject<string>();

  //alerts
  errorMessage = null;
  successMessage = null;
  settingResult: any;

  setting: any = {
    selection: "",
    firstoption: "",
    secondoption: "",
    thirdoption: ""
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
      .saveSettings(this.setting)
      .pipe(first())
      .subscribe(res => {
        this._success.next("content saved..");
        this.getSetting();
      });
  }

  getSetting() {
    this.settingsService
      .getSettings()
      .pipe(first())
      .subscribe(res => {
        this.setting = res;
      });
  }
}
