import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService, CaptchaService } from "src/app/shared";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  error: any;
  captcha: any;
  siteKey: any;
  otp: any;
  otp_required: boolean;
  isOtpExpired: boolean;
  loginResp: any;
  Email: any;
  Password: any;
  errorm: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private captchaService: CaptchaService
  ) {}

  ngOnInit() {
    this.captchaService
      .getCaptcha("adminlogin")
      .pipe(first())
      .subscribe(res => {
        this.siteKey = res["sitekey"];
      });
  }

  onChangepass() {
    this.router.navigate(["home/changepass"]);
  }

  onLoginSubmit() {
    this.error = null;
    this.errorm = '';

    if (!this.Password && !this.Email) {
      this.error = "Please enter valid Email and Password";
      return;
    }
    if (this.siteKey && !this.captcha) {
      this.error = "Please resolve Captcha";
      return;
    }
    if (!this.Email) {
      this.error = "Please enter Email";
      return;
    }
    if (!this.Password) {
      this.error = "Please enter Password";
      return;
    }

    interface LoginResponse {
      success?: boolean;
      token?: string;
      message?: string | { english: string };
      status?: string;
      error?: number;
      temp?: boolean;
      [key: string]: any;
    }

    this.authenticationService
      .login(this.Email, this.Password, this.captcha, "adminlogin")
      .pipe(first())
      .subscribe((res: LoginResponse) => {
        if (res.success && res.token) {
          this.authenticationService.saveLogin(res);
          this.router.navigate(["/admin/dashboard"]);
        } else {
          this.error = res.message;
          return;
        }
      });
  }

  onOTPResend() {
    this.errorm = '';
    this.otp = null;

    this.authenticationService
      .resendOTP(this.loginResp.token, "adminlogin")
      .pipe(first())
      .subscribe(res => {
        this.isOtpExpired = false;
      });
  }

  onOTPSubmit() {
    this.errorm = '';
    if (!this.otp) {
      this.errorm = "Please enter otp";
      return;
    }

    this.authenticationService
      .validateOTP(this.otp, this.loginResp.token)
      .pipe(first())
      .subscribe(res => {
        this.isOtpExpired = false;

        if (res["error"]) {
          this.errorm = res["message"]["english"];
          if (res["error"] === 5006) {
            this.isOtpExpired = true;
          }
        } else {
          this.authenticationService.saveLogin(res);
          this.router.navigate(["/admin/dashboard"]);
        }
      });
  }

  onForgotpass() {
    this.router.navigate(["/pages/forgotpass"]);
  }

  captchaResolved(e) {
    this.captcha = e;
    this.error = null;
  }

  onRegister() {
    this.router.navigate(["home/register"]);
  }

  ngOnDestroy() {}
}
