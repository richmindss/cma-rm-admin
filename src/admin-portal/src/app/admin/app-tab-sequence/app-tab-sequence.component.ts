import { Component, OnInit } from "@angular/core";
import { AppTabService } from "../../shared/services";
import { SettingsService } from "../../shared";
import { debounceTime, first } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-app-tab-sequence",
  templateUrl: "./app-tab-sequence.component.html",
  styleUrls: ["./app-tab-sequence.component.scss"]
})
export class AppTabSequenceComponent implements OnInit {
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
  tabs: any = [];
  constructor(
    private appTabService: AppTabService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.getSetting();

    this.initAlert();
    this.appTabService
      .loadAll()
      .pipe(first())
      .subscribe(res => {
        this.tabs = res;
        this.tabs.sort(function(a, b) {
          if (a.sequence > b.sequence) {
            return 1;
          }
          if (a.sequence < b.sequence) {
            return -1;
          }
          return 0;
        });
      });
  }
  initAlert() {
    this._success.subscribe(message => (this.successMessage = message));
    this._success
      .pipe(debounceTime(2000))
      .subscribe(() => (this.successMessage = null));
  }
 

  onCheckChange(tab) {
    this.appTabService
      .handleActive(tab)
      .pipe(first())
      .subscribe(res => {});
  }

  moveUp(tab) {
    var seq = tab.sequence;

    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].sequence == seq - 1) {
        this.tabs[i].sequence = seq;
        tab.sequence = seq - 1;
        this.appTabService
          .handleSequence(tab, this.tabs[i])
          .pipe(first())
          .subscribe(res => {});
        break;
      }
    }
  }

  moveDown(tab) {
    var seq = tab.sequence;

    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].sequence == seq + 1) {
        this.tabs[i].sequence = seq;
        tab.sequence = seq + 1;
        this.appTabService
          .handleSequence(tab, this.tabs[i])
          .pipe(first())
          .subscribe(res => {});
        break;
      }
    }
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
