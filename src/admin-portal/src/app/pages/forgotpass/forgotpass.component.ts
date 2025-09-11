import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ResetpasswordService,
  CaptchaService,
  AuthenticationService
} from "src/app/shared/services";
import { first } from "rxjs/operators";

@Component({
  selector: "app-forgotpass",
  templateUrl: "./forgotpass.component.html",
  styleUrls: ["./forgotpass.component.scss"]
})
export class ForgotpassComponent implements OnInit, OnDestroy {
  storeSub: any;
  username: any;
  error: any;
  captcha: any;
  siteKey: any;
  otp_error: any;
  otp: any;
  otp_required: boolean;
  isOtpExpired: boolean;
  label_text: string;
  currentLanguage: any;
  resetResp: any;
  reset_token: any;
  isValid: boolean;
  validationResp: any;
  password: any;
  confirm_password: any;
  success_message: string;
  success: any;
  success_message1: any;
  error1: any;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private captchaService: CaptchaService,
    private resetpasswordService: ResetpasswordService,
    private authenticationService: AuthenticationService
  ) {}

  validatePassword(password) {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#])[A-Za-z\d@$#].{8,15}$/.test(
        password
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      this.reset_token = params["rt"];
      if (!this.reset_token) {
        this.captchaService
          .getCaptcha("adminforgotpassword")
          .pipe(first())
          .subscribe(res => {
            this.siteKey = res["sitekey"];
            this.label_text = "Forgot Password";
          });
      } else {
        this.label_text = "Forgot Password";
        this.resetpasswordService
          .validateToken(this.reset_token)
          .pipe(first())
          .subscribe(res => {
            if (res["error"]) {
              this.error = res["message"]["english"];
              return;
            }
            this.isValid = true;
            this.validationResp = res;
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  captchaResolved(e) {
    this.captcha = e;
    this.error = null;
    this.success_message = null;
  }

  onSubmitClick() {
    this.error = null;
    this.success_message = null;

    if (!this.username) {
      this.error = "Please enter valid Email Id or Mobile Number or User ID";
      return;
    }
    if (this.siteKey && !this.captcha) {
      this.error = "Please resolve captcha";
      return;
    }

    this.resetpasswordService
      .forgotPassword(this.username)
      .pipe(first())
      .subscribe(res => {
        // MAP with language
        if (this.siteKey) {
          grecaptcha.reset();
        }

        if (res["error"]) {
          this.error = res["message"]["english"];
          return;
        }
        if (!res["temp"]) {
          this.error1 = res["message"]["english"];
          return;
        } else {
          this.otp_required = true;
          this.resetResp = res;
        }
      });
  }

  onOTPResend() {
    this.otp_error = null;
    this.otp = null;

    this.authenticationService
      .resendOTP(this.resetResp.token, "adminforgotpassword")
      .pipe(first())
      .subscribe(res => {
        this.isOtpExpired = false;
      });
  }

  onOTPSubmit() {
    this.error = null;
    this.success_message = null;

    if (!this.otp) {
      this.otp_error = "Please enter OTP";
      return;
    }

    this.resetpasswordService
      .validateOTP(this.otp, this.resetResp.token)
      .pipe(first())
      .subscribe(res => {
        // MAP with language
        this.isOtpExpired = false;
        if (res["error"]) {
          this.otp_error = res["message"]["english"];
          if (res["error"] === 5006) {
            this.isOtpExpired = true;
          }
        } else {
          this.success_message = res["message"]["english"];
          return;
        }
      });
  }

  onResetClick() {
    this.error = null;
    if (!this.validatePassword(this.password)) {
      this.error =
        "Password should be of minimum 8 and maximum of 14 length.Password should contain both upper-case and lower-case letters (case sensitivity),Should contain one or more numerical digits,Should contain special characters, such as @, #, $";
      return;
    }

    if (this.password !== this.confirm_password) {
      this.error = "Password and Confirm password are not matching.";
      return;
    }

    // get all from session
    this.resetpasswordService
      .resetPassword(
        this.password,
        this.validationResp.token,
        this.validationResp.log_id,
        this.validationResp.user_id
      )
      .pipe(first())
      .subscribe(res => {
        if (res["error"]) {
          this.error = res["message"]["english"];
        } else {
          this.success_message = res["message"]["english"];
          return;
        }
      });
  }

  onLoginClick() {
    this.router.navigate(["pages/login"]);
  }

  onBackToLogin() {
    this.router.navigate(["pages/login"]);
  }
}
