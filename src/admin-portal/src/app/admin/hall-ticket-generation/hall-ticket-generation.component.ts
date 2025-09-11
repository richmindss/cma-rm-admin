import { Component, OnInit } from "@angular/core";
import { HallTicketGenerationService, SettingsService } from "src/app/shared";
import { AlertService } from "../../shared/services/alert/alert.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-hall-ticket-generation",
  templateUrl: "./hall-ticket-generation.component.html",
  styleUrls: ["./hall-ticket-generation.component.scss"]
})
export class HallTicketGenerationComponent implements OnInit {

  fileType: any = "image/jpg,image/jpeg,image/png";
  sender = "hall-ticket-generation";
  currenttab: any;
  content: any;
  newContent: any;
  dataResult: any;
  type: any;
  contentMode = "LATER";
  errPhoto: any;
  documentId: any;
  currentContent: any;
  wordType: any = "officedocument";
  errHall= "";
  hallTicketAvailable= false;


  constructor(
    private hallTicketGenerationService: HallTicketGenerationService,
    private alertService: AlertService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.getSettings ();
   }

  onContentChanged(e) {
    this.newContent = e;
  }

  saveHallTicket() {
    var data = Object.assign({});
    data.documentid = this.documentId;
    data.content = this.newContent || this.content;

    this.hallTicketGenerationService
      .saveHallTicket(data)
      .pipe(first())
      .subscribe(res => {
        this.alertService.show(this.sender, "Hall Ticket Saved ....");
      });
  }

  onReportTemp() {
    this.currentContent = event;
    this.hallTicketGenerationService
      .getHallTicket()
      .pipe(first())
      .subscribe(res => {
        this.dataResult = res[0];
        if (this.dataResult) {
          this.content = this.dataResult.content;
        } else {
          this.content = "";
        }
      });
    this.contentMode = "NOW";
  }

  onBackgroundImg() {
    this.contentMode = "LATER";
  }

  ondocError(e) {
    this.errPhoto = e;
  }

  ondocHallError (e){
    this.errHall = e;
  }

  ondocUploaded(e) {
    this.documentId = e.documentid;
    this.errHall = "";
    this.errPhoto = "";
  }

  onReportTemplate (){
    this.contentMode = 'DOC_TEMPLATE';
  }

  
  getSettings (){
    this.settingsService.getSettings ()
    .pipe (first())
    .subscribe ( (res:any) =>{

      if (res){
        this.hallTicketAvailable = res.hall_ticket || false;
      }else {
        this.hallTicketAvailable = false;
      }
      
    });
  }

  onAvailableClick (){
    this.settingsService.setHallTicket (this.hallTicketAvailable)
    .pipe (first())
    .subscribe (res=>{
      this.alertService.s ("Updated ticket status");
    });
  }
}
