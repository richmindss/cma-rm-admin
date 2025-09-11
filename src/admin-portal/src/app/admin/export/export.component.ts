import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CoreService, AuthenticationService } from "src/app/shared";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-export",
  templateUrl: "./export.component.html",
  styleUrls: ["./export.component.scss"]
})
export class ExportComponent implements OnInit {
  dataAvailable = false;
  @Input() url: any; //= "";
  statusurl = null;
  @Input() docType: any; //= //"header_logo";
  @Input() msg: any;
  @Input() header: any;
  @Input() dropZoneId: any;
  @Input() img_width;
  @Output() docImport = new EventEmitter<any>();
  @Output() docError = new EventEmitter<any>();
  @Input() fileType: any;
  @Input() uploadType: any;
  status: any;

  constructor(
    private coreService: CoreService,
    private authenticationService: AuthenticationService,
    private constantApi: ConstantService
  ) {}

  ngOnInit() {
    this.url = this.coreService.getRootPath() + "/document/" + this.url;

    this.statusurl = this.getImgUrl();

    this.dataAvailable = true;

    this.getEmpStatus();
  }

  getRand() {
    var d = new Date();
    return d.getHours() + "-" + d.getSeconds() + "--" + d.getMilliseconds();
  }

  getImgUrl() {
    var t = this.getRand();
    var url = this.coreService.getRootPath() + "/document/type/" + this.docType;
    url += "?t=" + t;
    url += "&appname=" + this.coreService.getAppName();
    url += "&usertype=" + this.coreService.getUserType();
    url += "&candidateid=" + this.authenticationService.getAuthToken();
    return url;
  }

  ondocUploaded(e) {
    this.statusurl = this.getImgUrl();
  }

  ondocImport(e) {
    this.docImport.emit(e);
  }
  ondocError(e) {
    this.docError.emit(e);
  }

  getEmpStatus() {
    this.constantApi
      .getConstantValue("EXPORTLIST")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.status = res;
        }
      });
  }
}
