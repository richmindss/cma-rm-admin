import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  private path = "/resetpassword";

  constructor(private backendService:BackendService) { }

  forgotPassword (userid:any){
    return this.backendService.post (this.path + "/forgot", {user: userid});
  }
  validateToken (token:any){
    return this.backendService.post (this.path + "/validate/token", {token: token});
  }
  validateOTP(otp: string, token: string) {
    return this.backendService.post(this.path + "/validate/otp" , 
          {otp: otp, session_id: token
          });
  }

  resetPassword(password: string, token :  string, log_id: string, user_id: string){
    return this.backendService.post(this.path + "/reset" , 
          { password: password,
            token: token,
            user_id : user_id,
            log_id : log_id
          });
  }
  resetPasswordbyUser(oldPassword : string, newPassword: string){
    return this.backendService.post(this.path + "/reset/user",
    {
      old_password : oldPassword,
      new_password : newPassword
    });
  }

  



}
