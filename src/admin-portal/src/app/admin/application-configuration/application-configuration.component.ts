import { Component, OnInit } from "@angular/core";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { ApplicationConfiguartionService } from "../../shared/services/application-configuration/application-configuration.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-application-configuration",
  templateUrl: "./application-configuration.component.html",
  styleUrls: ["./application-configuration.component.scss"]
})
export class ApplicationConfigurationComponent implements OnInit {
  criteria: any = [];
  error: any;
  tab: any;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  examid: any;
  errorMessage = null;
  successMessage = null;

  constructor(
    private constantApi: ConstantService,
    private applicationApi: ApplicationConfiguartionService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examid = params.get("id");
    });

    this.loadAllApplication();
    //this.getApplication();
    this.initAlert();
  }
  loadAllApplication() {
    this.constantApi
      .getConstantValue("APPLICATION_CONFIGURATION")
      .pipe(first())
      .subscribe(res => {
        this.criteria = res;
        if (this.examid) {
          this.getApplication(this.examid);
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
  getApplication(examid) {
    this.applicationApi
      .getApplicationConfiguration(examid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          var answers = res["answers"];
          //append the answers here ..
          for (var i = 0; i < answers.length; i++) {
            for (var j = 0; j < this.criteria.length; j++) {
              if (
                answers[i]._id.toString() == this.criteria[j]._id.toString()
              ) {
                this.criteria[j].answer = answers[i].answer;
              }
            }
          }
        }
      });
  }
  validateForm() {
    for (var i = 0; i < this.criteria.length; i++) {
      if (!this.criteria[i].answer) {
        this.error =
          "Please select  response to : '" + this.criteria[i].name + "'";
        return false;
      }
    }
    return true;
  }

  onSave() {
    this.error = "";

    this.applicationApi
      .saveApplicationConfiguration(this.criteria, this.examid)
      .pipe(first())
      .subscribe(res => {
        if (res["status"] == "error") {
          //show error alert ..
        } else {
          //show success alert ..
          this._success.next("Application Configuration saved..");
        }

        //cb  && cb (res);
      });
  }
}
