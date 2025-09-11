import { Component, OnInit } from "@angular/core";
import { SecurityAuthenticationService } from "../../shared/services/security-authentication/security-authentication.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";

@Component({
  selector: "app-security-authentication",
  templateUrl: "./security-authentication.component.html",
  styleUrls: ["./security-authentication.component.scss"]
})
export class SecurityAuthenticationComponent implements OnInit {
  name: string;
  isRegisterSms: boolean;
  isRegisterEmail: boolean;
  isRegisterCaptcha: boolean;
  isForgotPassSms: boolean;
  isForgotPassEmail: boolean;
  isForgotPassCaptcha: boolean;
  isLoginSms: boolean;
  isLoginEmail: boolean;
  isLoginCaptcha: boolean;
  isAdminLoginSms: boolean;
  isAdminLoginEmail: boolean;
  isAdminLoginCaptcha: boolean;
  isAdminForgotPassSms: boolean;
  isAdminForgotPassEmail: boolean;
  isAdminForgotPassCaptcha: boolean;
  isManagerLoginSms: boolean;
  isManagerLoginEmail: boolean;
  isManagerLoginCaptcha: boolean;
  isManagerForgotPassSms: boolean;
  isManagerForgotPassEmail: boolean;
  isManagerForgotPassCaptcha: boolean;
  isExamLoginSms: boolean;
  isExamLoginEmail: boolean;
  isExamLoginCaptcha: boolean;
  isExamForgotPassSms: boolean;
  isExamForgotPassEmail: boolean;
  isExamForgotPassCaptcha: boolean;
  isTestcenterLoginSms: boolean;
  isTestcenterLoginEmail: boolean;
  isTestcenterLoginCaptcha: boolean;
  isTestcenterForgotPassSms: boolean;
  isTestcenterForgotPassEmail: boolean;
  isTestcenterForgotPassCaptcha: boolean;

  isCustomerLoginSms: boolean;
  isCustomerLoginEmail: boolean;
  isCustomerLoginCaptcha: boolean;
  isCustomerForgotPassSms: boolean;
  isCustomerForgotPassEmail: boolean;
  isCustomerForgotPassCaptcha: boolean;

  registerResult: any;
  forgotPasswordResult: any;
  loginResult: any;
  adminLoginResult: any;
  adminForgotPasswordResult: any;
  managerLoginResult: any;
  managerForgotPasswordResult: any;
  examLoginResult: any;
  examForgotPasswordResult: any;
  testcenterLoginResult: any;
  testcenterForgotPasswordResult: any;
  customerLoginResult: any;
  customerForgotPasswordResult: any;

  isSmsFinal: boolean;
  isEmailFinal: boolean;
  isCaptchaFinal: boolean;
  private _success = new Subject<string>();
  private _error = new Subject<string>();

  //alerts
  errorMessage = null;
  successMessage = null;

  constructor(private securityServiceApi: SecurityAuthenticationService) {}

  ngOnInit() {
    this.initAlert();
    this.getRegisterResult();
    this.getForgotPasswordResult();
    this.getLoginResult();
    this.getAdminLoginResult();
    this.getAdminForgotPasswordResult();
    this.getManagerLoginResult();
    this.getManagerForgotPasswordResult();
    this.getExamLoginResult();
    this.getExamForgotPasswordResult();
    this.getTestCenterLoginResult();
    this.getTestCenterForgotPasswordResult();
    this.getCustomerLoginResult();
    this.getCustomerForgotPasswordResult();
  }

  getRegisterResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("register")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.registerResult = res;
          this.isRegisterSms = this.registerResult.sms;
          this.isRegisterEmail = this.registerResult.email;
          this.isRegisterCaptcha = this.registerResult.captcha;
        }
      });
  }

  getForgotPasswordResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("forgotpassword")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.forgotPasswordResult = res;
          this.isForgotPassSms = this.forgotPasswordResult.sms;
          this.isForgotPassEmail = this.forgotPasswordResult.email;
          this.isForgotPassCaptcha = this.forgotPasswordResult.captcha;
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

  getLoginResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("login")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.loginResult = res;
          this.isLoginSms = this.loginResult.sms;
          this.isLoginEmail = this.loginResult.email;
          this.isLoginCaptcha = this.loginResult.captcha;
        }
      });
  }

  getAdminLoginResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("adminlogin")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.adminLoginResult = res;
          this.isAdminLoginSms = this.adminLoginResult.sms;
          this.isAdminLoginEmail = this.adminLoginResult.email;
          this.isAdminLoginCaptcha = this.adminLoginResult.captcha;
        }
      });
  }

  getAdminForgotPasswordResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("adminforgotpassword")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.adminForgotPasswordResult = res;
          this.isAdminForgotPassSms = this.adminForgotPasswordResult.sms;
          this.isAdminForgotPassEmail = this.adminForgotPasswordResult.email;
          this.isAdminForgotPassCaptcha = this.adminForgotPasswordResult.captcha;
        }
      });
  }

  getManagerLoginResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("managerlogin")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.managerLoginResult = res;
          this.isManagerLoginSms = this.managerLoginResult.sms;
          this.isManagerLoginEmail = this.managerLoginResult.email;
          this.isManagerLoginCaptcha = this.managerLoginResult.captcha;
        }
      });
  }

  getManagerForgotPasswordResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("managerforgotpassword")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.managerForgotPasswordResult = res;
          this.isManagerForgotPassSms = this.managerForgotPasswordResult.sms;
          this.isManagerForgotPassEmail = this.managerForgotPasswordResult.email;
          this.isManagerForgotPassCaptcha = this.managerForgotPasswordResult.captcha;
        }
      });
  }

  getExamLoginResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("examlogin")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.examLoginResult = res;
          this.isExamLoginSms = this.examLoginResult.sms;
          this.isExamLoginEmail = this.examLoginResult.email;
          this.isExamLoginCaptcha = this.examLoginResult.captcha;
        }
      });
  }

  getExamForgotPasswordResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("examforgotpassword")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.examForgotPasswordResult = res;
          this.isExamForgotPassSms = this.examForgotPasswordResult.sms;
          this.isExamForgotPassEmail = this.examForgotPasswordResult.email;
          this.isExamForgotPassCaptcha = this.examForgotPasswordResult.captcha;
        }
      });
  }

  getTestCenterLoginResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("testcenterlogin")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.testcenterLoginResult = res;
          this.isTestcenterLoginSms = this.testcenterLoginResult.sms;
          this.isTestcenterLoginEmail = this.testcenterLoginResult.email;
          this.isTestcenterLoginCaptcha = this.testcenterLoginResult.captcha;
        }
      });
  }

  getTestCenterForgotPasswordResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("testcenterforgotpassword")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.testcenterForgotPasswordResult = res;
          this.isTestcenterForgotPassSms = this.testcenterForgotPasswordResult.sms;
          this.isTestcenterForgotPassEmail = this.testcenterForgotPasswordResult.email;
          this.isTestcenterForgotPassCaptcha = this.testcenterForgotPasswordResult.captcha;
        }
      });
  }

  getCustomerLoginResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("customerlogin")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.customerLoginResult = res;
          this.isCustomerLoginSms = this.customerLoginResult.sms;
          this.isCustomerLoginEmail = this.customerLoginResult.email;
          this.isCustomerLoginCaptcha = this.customerLoginResult.captcha;
        }
      });
  }

  getCustomerForgotPasswordResult() {
    this.securityServiceApi
      .getSecurityAuthenticationByName("customerforgotpassword")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.customerForgotPasswordResult = res;
          this.isCustomerForgotPassSms = this.customerForgotPasswordResult.sms;
          this.isCustomerForgotPassEmail = this.customerForgotPasswordResult.email;
          this.isCustomerForgotPassCaptcha = this.customerForgotPasswordResult.captcha;
        }
      });
  }

  checkValue(type) {
    if (type == "register") {
      this.isSmsFinal = this.isRegisterSms;
      this.isEmailFinal = this.isRegisterEmail;
      this.isCaptchaFinal = this.isRegisterCaptcha;
    }
    if (type == "forgotpassword") {
      this.isSmsFinal = this.isForgotPassSms;
      this.isEmailFinal = this.isForgotPassEmail;
      this.isCaptchaFinal = this.isForgotPassCaptcha;
    }
    if (type == "login") {
      this.isSmsFinal = this.isLoginSms;
      this.isEmailFinal = this.isLoginEmail;
      this.isCaptchaFinal = this.isLoginCaptcha;
    }
    if (type == "adminlogin") {
      this.isSmsFinal = this.isAdminLoginSms;
      this.isEmailFinal = this.isAdminLoginEmail;
      this.isCaptchaFinal = this.isAdminLoginCaptcha;
    }
    if (type == "adminforgotpassword") {
      this.isSmsFinal = this.isAdminForgotPassSms;
      this.isEmailFinal = this.isAdminForgotPassEmail;
      this.isCaptchaFinal = this.isAdminForgotPassCaptcha;
    }
    if (type == "managerlogin") {
      this.isSmsFinal = this.isManagerLoginSms;
      this.isEmailFinal = this.isManagerLoginEmail;
      this.isCaptchaFinal = this.isManagerLoginCaptcha;
    }
    if (type == "managerforgotpassword") {
      this.isSmsFinal = this.isManagerForgotPassSms;
      this.isEmailFinal = this.isManagerForgotPassEmail;
      this.isCaptchaFinal = this.isManagerForgotPassCaptcha;
    }
    if (type == "examlogin") {
      this.isSmsFinal = this.isExamLoginSms;
      this.isEmailFinal = this.isExamLoginEmail;
      this.isCaptchaFinal = this.isExamLoginCaptcha;
    }
    if (type == "examforgotpassword") {
      this.isSmsFinal = this.isExamForgotPassSms;
      this.isEmailFinal = this.isExamForgotPassEmail;
      this.isCaptchaFinal = this.isExamForgotPassCaptcha;
    }
    if (type == "testcenterlogin") {
      this.isSmsFinal = this.isTestcenterLoginSms;
      this.isEmailFinal = this.isTestcenterLoginEmail;
      this.isCaptchaFinal = this.isTestcenterLoginCaptcha;
    }
    if (type == "testcenterforgotpassword") {
      this.isSmsFinal = this.isTestcenterForgotPassSms;
      this.isEmailFinal = this.isTestcenterForgotPassEmail;
      this.isCaptchaFinal = this.isTestcenterForgotPassCaptcha;
    }

    if (type == "customerlogin") {
      this.isSmsFinal = this.isCustomerLoginSms;
      this.isEmailFinal = this.isCustomerLoginEmail;
      this.isCaptchaFinal = this.isCustomerLoginCaptcha;
    }
    if (type == "customerforgotpassword") {
      this.isSmsFinal = this.isCustomerForgotPassSms;
      this.isEmailFinal = this.isCustomerForgotPassEmail;
      this.isCaptchaFinal = this.isCustomerForgotPassCaptcha;
    }
    this.securityServiceApi
      .saveSecurityAuthentication(
        type,
        this.isSmsFinal,
        this.isEmailFinal,
        this.isCaptchaFinal
      )
      .pipe(first())
      .subscribe(res => {
        this._success.next("content saved..");
      });
  }
}
