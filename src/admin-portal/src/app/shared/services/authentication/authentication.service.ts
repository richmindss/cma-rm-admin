import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  private path = '/authentication';
  private userSessionKey = 'user';

  private otp_path = '/otp';

  constructor(private backendService: BackendService,
              private storageService: StorageService ) { }



  login(Email: string, Password: string, captcha: string, page:string) {
    return this.backendService.post('/login',
     {Email: Email, Password: Password, captcha: captcha, page: page});
  }

  
  saveLogin (userDetails: any) {
    this.storageService.save (this.userSessionKey, userDetails);
  }

  isLoggedIn () {
    const user = this.storageService.get (this.userSessionKey); 
    //console.log ("user details ..", user);
   if( user && user.token) {
      return true;
    } else {
      return false;
    }
  }

  me () {
    return this.storageService.get (this.userSessionKey);
  }

  getAuthToken () {
    const user = this.storageService.get (this.userSessionKey);
    if (!user) {
      return null;
    } else {
      return user.token;
    }
  }

  logout (candidateid:any) {
    //this.storageService.clear();
    return this.backendService.get('/logout');
  }

  getUserDetails(){
     return this.storageService.get(this.userSessionKey);
  }


  validateOTP(otp: string, token: string) {
    return this.backendService.post(this.otp_path + "/validate" , 
          {otp: otp, session_id: token
          });
  }

  resendOTP( token: string,   page : string) {
    return this.backendService.post(this.otp_path + "/resend" , 
          {session_id: token,  
          page: page});
  }

}
