import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppTabService } from "../../../shared/services";
import { first } from "rxjs/operators";

@Component({
  selector: "app-template-tab",
  templateUrl: "./template-tab.component.html",
  styleUrls: ["./template-tab.component.scss"]
})
export class TemplateTabComponent implements OnInit {
  @Output() onTabClicked = new EventEmitter<any>();

  tabs: any = [];
  currenttab: any = {};

  constructor(private appTabService: AppTabService) {}

  ngOnInit() {
    this.getTabs();
  }

  getTabs() {
    this.appTabService
      .loadAll()
      .pipe(first())
      .subscribe(res => {
        this.tabs = res;
        this.currenttab = this.tabs[0];
        this.onTabClick(this.currenttab);
       // console.log ("I got htese tabs ---", this.tabs);
      });
  }

  getSorted() {
    this.tabs.sort(function(a, b) {
      if (a.sequence > b.sequence) {
        return 1;
      }
      if (a.sequence < b.sequence) {
        return -1;
      }
      return 0;
    });
    return this.tabs;
  }

  onTabClick(tab) {
    this.currenttab = tab;
    this.onTabClicked.emit(tab);
  }
}
