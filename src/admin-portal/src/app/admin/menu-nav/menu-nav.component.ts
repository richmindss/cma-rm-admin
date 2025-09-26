import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { SettingsService } from "src/app/shared";
import { first } from "rxjs/operators";

@Component({
  selector: "app-menu-nav",
  templateUrl: "./menu-nav.component.html",
  styleUrls: ["./menu-nav.component.scss"]
})
export class MenuNavComponent implements OnInit {
  menus:any = [];
  
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.settingsService
      .getMenu()
      .pipe(first())
      .subscribe(res => {
        console.log(res)
        this.menus = res["data"];
        this.makeActive();
      });
  }

  getMenuText(m) {
    let t = m.text;
    let len = 20;

    if (t && t.length > len) {
      return t.substr(0, len) + "...";
    }
    return t;
  }

  makeActive() {
    if (!this.menus || this.menus.length == 0) {
      return;
    }

    var url = this.router.url.toLowerCase();
    for (var i = 0; i < this.menus.length; i++) {
      if (this.menus[i].target) {
        var text = this.menus[i].target.toLowerCase();
        this.menus[i].active = url.indexOf(text) >= 0;
      }
    }
  }

  makeInactive = function(items, excludeParent) {
    for (var i = 0; i < items.length; i++) {
      items[i].active = false;
      if (items[i] != excludeParent) {
        items[i].expanded = false;
      }
      if (items[i].submenu && items[i].submenu.length > 0) {
        this.makeInactive(items[i].submenu);
      }
    }
  };

  onMenuClick(menu, parent) {
    var isExpanded = menu.expanded;

    this.makeInactive(this.menus, parent);

    menu.active = true;
    if (menu.submenu && menu.submenu.length > 0) {
      menu.expanded = !isExpanded;
      if (parent){
        parent.expanded = true;
      }
      
    } else {
      this.router.navigate([menu.target]);
    }
  }
}
