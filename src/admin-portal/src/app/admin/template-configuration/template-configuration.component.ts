import { OnInit, Component } from "@angular/core";
import { TemplateConfigurationService } from "../../shared/services/template-configuration/template-configuration.service";
import { AlertService } from "../../shared/services/alert/alert.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-template-configuration",
  templateUrl: "./template-configuration.component.html",
  styleUrls: ["./template-configuration.component.scss"]
})
export class TemplateConfigurationComponent implements OnInit {
  currenttab: any;
  content: any;
  newContent: any;
  dataResult: any;
  type: any;
  sender = "template-configuration";

  constructor(
    private templateConfigurationService: TemplateConfigurationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  onTabClicked(event) {
    this.currenttab = event;

    this.templateConfigurationService
      .getTemplateConfigByType(this.currenttab.code)
      .pipe(first())
      .subscribe(res => {
        this.dataResult = res;
        if (this.dataResult) {
          this.content = this.dataResult.text;
        } else {
          this.content = "";
        }
      });
  }

  onContentChanged(e) {
    this.newContent = e;
  }

  saveTabTemplate() {
    this.templateConfigurationService
      .saveTemplateConfiguration(
        this.currenttab.code,
        this.newContent || this.content
      )
      .pipe(first())
      .subscribe(res => {
        this.alertService.show(this.sender, "Template Saved ....");
      });
  }
}
