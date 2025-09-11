import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EventConfigurationService } from "../../shared/services/event-configuration/event-configuration.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { AlertService } from 'src/app/shared';

@Component({
  selector: "app-email-sms",
  templateUrl: "./email-sms.component.html",
  styleUrls: ["./email-sms.component.scss"]
})
export class EmailSmsComponent implements OnInit {
  smstxt: any;
  emailtemplate: any;
  smsEnable: boolean;
  emailEnable: boolean;
  eventid: any;
  event: any;
  eventname: any;
  eventConfResult: any;
  error: any;
  tags: any;

  emailsubject:any; 
 

  constructor(
    private eventConfigurationServiceApi: EventConfigurationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
     
    this.route.paramMap.subscribe(params => {
      this.eventid = params.get("id");
     
    this.getEventdetails();
    this.getEventConfiguration();
    this.getTags();
  });
  }

   

  getEventdetails() {
    this.eventConfigurationServiceApi
      .getEventbyId(this.eventid)
      .pipe(first())
      .subscribe(res => {
        this.event = res;
        this.eventname = this.event.name;  
      });
  }

  getTags() {
    this.eventConfigurationServiceApi
      .getTags()
      .pipe(first())
      .subscribe(res => {
        this.tags = res;
      });
  }

  onSubmit() {
    if (!this.emailEnable && !this.smsEnable) {
      this.error = "Please select Email or SMS Configuration";
      return;
    }
    if (this.emailEnable && !this.emailtemplate) {
      this.error = "Invalid Email Content";
      return;
    }
    if (this.smsEnable && !this.smstxt) {
      this.error = "Invalid Sms Content";
      return;
    }
    this.eventConfigurationServiceApi
      .saveEventConfiguration(
        this.eventid,
        this.emailEnable,
        this.emailtemplate,
        this.smsEnable,
        this.smstxt,
        this.emailsubject
      )
      .subscribe(res => {
        this.alertService.s ("context saved..."); 
      });
  }

  getEventConfiguration() {
    this.eventConfigurationServiceApi
      .getEventConfigByEventId(this.eventid)
      .pipe(first())
      .subscribe(res => { 
        if (res) {
          this.eventConfResult = res;
          this.smsEnable = this.eventConfResult.sms_enable;
          this.emailEnable = this.eventConfResult.email_enable;
          this.emailtemplate = this.eventConfResult.email_template;
          this.smstxt = this.eventConfResult.sms_content;
          this.emailsubject = this.eventConfResult.emailsubject;
        }
      });
  }

  onCancel() {
    this.router.navigate(["admin/event-configuration"]);
  }
}
