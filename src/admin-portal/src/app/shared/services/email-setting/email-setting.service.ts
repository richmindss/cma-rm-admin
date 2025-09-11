import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})

export class EmailSettingService {

  
  private path = '/email-setting';
  

  constructor(private backendService: BackendService) { }

  
  saveEmailSetting(name: string,description:string, hostname:string, port:string ,enable:boolean, fromemail:string, username:string, password:string) {
      
    return this.backendService.post(this.path + '/', {name: name, description:description, hostname:hostname, port:port, enable:enable, fromemail:fromemail, username:username, password:password });
  }
   
  getEmailSetting() {
      
    return this.backendService.get(this.path);
  }

  checkTestConnection(toemail:string) {
      
    return this.backendService.post(this.path + '/email',{toemail:toemail});
  }
 
}