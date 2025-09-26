import { Component, OnInit } from "@angular/core";
import { CoreService, AuthenticationService } from "../../services";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";


@Component({
  selector: "app-home-header",
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.scss"]
})
export class HomeHeaderComponent implements OnInit {
  data: any;
  logoUrl: any;
  user: any = {};
  apiUrl: any;
  docType: any = "app_logo";
  constructor(
    private coreService: CoreService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.apiUrl = this.coreService.getRootPath();
    this.user = this.authenticationService.getUserDetails();

    this.logoUrl = this.getImgUrl();
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

  logout() {
    var token = this.authenticationService.getAuthToken();
    this.authenticationService
      .logout(token)
      .pipe(first())
      .subscribe(res => {
        this.authenticationService.saveLogin(null);
        this.router.navigate(["pages/login"]);
      });
  }
   changePassword(){
    this.router.navigate(['/admin/change-password']);
  }
}
