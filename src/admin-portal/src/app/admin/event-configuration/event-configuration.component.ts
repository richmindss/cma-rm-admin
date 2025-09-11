import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventConfigurationService } from "../../shared/services/event-configuration/event-configuration.service";
import { first } from "rxjs/operators";
import { AlertService } from "../../shared/services/alert/alert.service";


@Component({
  selector: "app-event-configuration",
  templateUrl: "./event-configuration.component.html",
  styleUrls: ["./event-configuration.component.scss"]
})
export class EventConfigurationComponent implements OnInit {
  events: any = [];
  error: any;
  event = {
    _id: "",
    code: "",
    name: ""
  };
  pageSize = 25;
  currentPage = 1;
  eventCount = 0;
  eventres;
  sender = "event-configuration"
  constructor(
    private modalService: NgbModal,
    private eventConfigurationServiceApi: EventConfigurationService,
    private alertService: AlertService,


  ) { }

  ngOnInit() {
    this.getEvents();
  }

  open(content, eventdetails) {
    this.error = "";
    this.event = eventdetails;

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => { });
  }


  getEvents() {
    this.eventConfigurationServiceApi
      .getEvent(this.currentPage, this.pageSize)
      .pipe(first())
      .subscribe(res => {
        this.events = res["data"];
        this.eventCount = res["count"];
      });
  }

  fetchUserData(e) {
    this.currentPage = e;

    this.getEvents();
  }

  deleteEvent(event) {
    this.eventConfigurationServiceApi
      .deleteEvent(event._id)
      .pipe(first())
      .subscribe(res => {
        this.events = res;
        this.getEvents();
      });
  }

  onSave() {
    if (!this.event.code) {
      this.error = "Invalid Event Code";
      return;
    }
    if (!this.event.name) {
      this.error = "Invalid Event Name";
      return;
    }

    this.eventConfigurationServiceApi
      .saveEvent(this.event.code, this.event.name, this.event._id)
      .pipe(first())
      .subscribe(res => {

        this.eventres = res;
        if (this.eventres.error) {
          this.error = this.eventres.message.english;
          return;
        }

        this.alertService.show(
          this.sender,
          "Event added/updated successfully"
        );

        this.getEvents();
        this.modalService.dismissAll();
      });
  }
}
