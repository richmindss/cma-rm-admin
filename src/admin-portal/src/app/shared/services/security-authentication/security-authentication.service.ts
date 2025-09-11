import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})

export class SecurityAuthenticationService {

  
  private path = '/security-authentication';
  

  constructor(private backendService: BackendService ) { }


  saveSecurityAuthentication(name: string, sms:boolean, email:boolean, captcha:boolean) {
   
    return this.backendService.post(this.path + '/', {name: name, captcha:captcha, sms:sms, email:email});
  }


  getSecurityAuthentication() {
   
    return this.backendService.get(this.path);
  }

  
  getSecurityAuthenticationByName(name: string) {
  
     return this.backendService.get(this.path + '/type/' + name);
  }
 
}