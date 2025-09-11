import { Component, OnInit } from "@angular/core";
import { AlertService, SettingsService } from "src/app/shared";
import { first } from "rxjs/operators";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit {
  dataAvailable = false;
  bannerType: any;
  fileType: any = "image/jpg,image/jpeg,image/png";
  error: any;
  scrolling:any;
  poweredByMsg:any;


  constructor(private settingsService: SettingsService,
    private alert: AlertService
    ) {}

  ngOnInit() {
    this.getAppHeader();

    this.dataAvailable = true;
  }

  getAppHeader() {
    this.settingsService
      .getSettings()
      .pipe(first())
      .subscribe(res => {
        this.bannerType = res["banner_type"] || "banner_text";
        this.scrolling = res["scroll"];
        this.poweredByMsg = res["poweredByMsg"];
      });
  }

  ondocError(e) {
    this.error = e;
  }

  onSelectionChange(bannerType) {
    this.settingsService
      .setHeaderPreference(bannerType)
      .pipe(first())
      .subscribe(res => {
      });
  }

  saveScrolling (){
    this.settingsService.setScroll (this.scrolling)
    .pipe (first())
    .subscribe (res=>{
       if(res["status"]=="error"){
         return alert(res["message"]);
        }else{
         this.alert.s ("Updated scrolling");
        }
      
    });
  }

  savePoweredByMsg (){
    this.settingsService.setPoweredBymsg(this.poweredByMsg)
    .pipe (first())
    .subscribe (res=>{
      this.alert.s("Updated poweredBy Msg");
    });
  }

}
