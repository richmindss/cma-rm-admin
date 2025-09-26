import { Component, OnInit, OnDestroy } from '@angular/core'; 
import {ResetpasswordService,AuthenticationService } from 'src/app/shared/services';

import { Router, ActivatedRoute } from '@angular/router'; 

// import { defaultLanguage } from '../../models/language';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  storeSub: any;
  public changepassDetails: any;
  userid: any;
  error: any;
  emailId:string;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;

  userdetails: any;
  resetResp: any;
  reset_token: any;
  isValid: boolean;
  validationResp: any;
  label_text: string;
  errorList: any = [];
  currentLanguage: any;
  success_message: string | null;
 
 

  constructor(
    private router: Router,
    private resetpasswordService: ResetpasswordService, 
    private authenticationService: AuthenticationService

  ) {

  }

 


  onSubmit() {
    this.errorList = [];
    this.error = null;
    this.success_message = null; 

    if (!this.oldPassword) {
      this.error = "Please enter valid existing Password";
      this.errorList.push(this.error);
    }

    if (!this.newPassword) {
      this.error = "Please enter valid Password";
      this.errorList.push(this.error);
    }
    
    if (!this.confirmPassword) {
      this.error = "Confirm Password field cannot be left blank.";
      this.errorList.push(this.error);
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = "Confirm Password should be same as New Password.";
      this.errorList.push(this.error);
    }

    if (this.errorList && this.errorList.length > 0) {
      return;
    }


    this.resetpasswordService.resetPasswordbyUser(this.oldPassword, this.newPassword, this.emailId)
      .pipe(first())
      .subscribe( (res:any) => {
       
        if (res["success"] == false){
          this.error = res.message;
          this.errorList.push(this.error);
          return;
        }

        if (res["success"] == false) {
          this.errorList.push(this.error);
          return;
        } else {
          this.oldPassword = null;
          this.newPassword = null;
          this.confirmPassword = null;
          this.success_message = res["message"];
          setTimeout ( ()=> {
            this.goToDashBorad ();
          }, 0);
          return;
        }
      });

  }



  goToDashBorad() {
    this.router.navigate(['pages/login']);

  }

 
  ngOnInit() {
    let user = this.authenticationService.getUserDetails();
    this.emailId = user?.record?.Email; 
    console.log(user)
    //this.listenToLang();
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    
  }

}