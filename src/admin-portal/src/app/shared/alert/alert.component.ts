import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { debounceTime, first } from "rxjs/operators";
import { AlertService } from "../services/alert/alert.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() sender: any;

  errorMessage = null;
  successMessage = null;
  initialized = false;

  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sender) {
      this.initAlert();
    }
  }

  initAlert() {
    if (this.initialized) {
      return;
    }
    this.alertService
      .getSuject()
      .pipe(first())
      .subscribe(data => {
        if (data.sender == this.sender) {
          if (data.type == "success") {
            this.successMessage = data.msg;
          }
          if (data.type == "error") {
            this.errorMessage = data.msg;
          }
        }
      });

    this.alertService
      .getSuject()
      .pipe(debounceTime(2000))
      .subscribe(() => {
        this.successMessage = null;
        this.errorMessage = null;
      });

    this.initialized = true;
  }
}
