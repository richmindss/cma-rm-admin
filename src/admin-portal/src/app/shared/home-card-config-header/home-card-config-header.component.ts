import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ContentService } from "../services";
import { first } from "rxjs/operators";
import { CoreService } from "src/app/shared/services";
import { AlertService } from "../../shared/services/alert/alert.service";
import * as moment from "moment";




@Component({
  selector: "app-home-card-config-header",
  templateUrl: "./home-card-config-header.component.html",
  styleUrls: ["./home-card-config-header.component.scss"]
})
export class HomeCardConfigHeaderComponent implements OnInit {
  @Input() contenttype: any;
  @Output() onHeaderChanged = new EventEmitter<any>();

  date: any;
  contentMode: any = "NOW";
  time: any = { hour: 23, minute: 59 };
  time_zone =    new Date().getTimezoneOffset();

  
  meridian = true;
  contentInfo: any;
  sender = "home-card-config-header";
  constructor(private contentService: ContentService,
    private coreService: CoreService,
    private alertService: AlertService,) { }

  ngOnInit() {
    this.defDate();
    this.refreshMode();
  }

  defDate() {
    this.date = moment().toDate();
  }


  getStartTime (content_info){

    let currOffset =  new Date().getTimezoneOffset();

    var t = moment.utc ( content_info.date, this.coreService.dateFormat())
            .add (content_info.time.hour, 'hour')
            .add (content_info.time.minute, 'minute')
            .add (content_info.time_zone, 'minute')
            .add (-currOffset, 'minute') 
            return t;
            
  }

  refreshMode() {
    this.contentService
      .getContent(this.contenttype)
      .pipe(first())
      .subscribe(res => {
        this.contentInfo = res;

        if (this.contentMode == "LATER" && this.contentInfo) {
        
            for (var i = 0; i < this.contentInfo.length; i++) {
              if (this.contentInfo[i].content_mode == this.contentMode) {

                
                if (this.contentMode == "LATER"){
                 var parsedDate =  this.getStartTime (this.contentInfo[i]);
                 this.date = parsedDate.toDate();
                 this.time = {hour: +parsedDate.format("HH"), minute: +parsedDate.format("mm")};
                }else {
                  this.defDate();
                  this.time = { hour: 23, minute: 59 };
                } 
              }
            }
          

          this.raiseEvent();
        }
      });
  }

  updateNow() {
    this.contentMode = "NOW";
    this.raiseEvent();
  }

  updateLater() {
    this.contentMode = "LATER";
    this.refreshMode();
  }

  onDateChanged() {
    console.log("date is => ", this.date);
    //this.raiseEvent ();
  }

  onTimeChanged(x) {
    console.log("time ==> ", this.time, x);
    //this.raiseEvent ();
  }

  saveLaterTime() {
    if (!this.date || !this.time) {
      this.alertService.err(this.sender, "No date/time found");
      return;
    }
    let date = this.coreService.fromDate(this.date);

    this.contentService
      .saveContent(this.contentMode, this.contenttype, date, this.time, this.time_zone)
      .pipe(first())
      .subscribe(res => {
        if (res["status"] == "error") {
          this.alertService.err(this.sender, res["message"]);
          return;
        }
        this.alertService.show(this.sender, "Date/ Time is saved");


        this.raiseEvent();
      });
  }

  raiseEvent() {
    var data = {
      contentMode: this.contentMode,
      date: this.date,
      time: this.time
    };

    this.onHeaderChanged.emit(data);
  }

  isNotSpecialCharAndAlphabet(evt) {
    return this.coreService.isNotSpecialCharAndAlphabet(evt);
  }




}
