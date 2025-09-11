import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfiguartionService {

  constructor(private backendService:BackendService) { }
  
  private path = '/application-configuration';
  

  saveApplicationConfiguration(criteria, examid){     
      
    
    return this.backendService.post (this.path ,{data: criteria, examid:examid});

  }
  
  getApplicationConfiguration(examid){
    
    return this.backendService.get (this.path + '/app/'+ examid);
    
  }


  getApplication(){
    return this.backendService.get(this.path + '/app');
  }

  getOrderInfo (examid, userid){
    return this.backendService.get(this.path + '/orderinfo/exams/' + examid + "/users/" + userid);
  }


  


}