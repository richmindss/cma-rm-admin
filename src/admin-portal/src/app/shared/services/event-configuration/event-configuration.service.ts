import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})
export class EventConfigurationService {

  private path = '/event-configuration';


  constructor(private backendService: BackendService) { }

  saveEvent(eventcode: string, eventname: string,_id:string) {
                
   return this.backendService.post(this.path + '/', {code: eventcode, name: eventname,_id:_id});
  }
             
  getEvent(currPage:number, pageSize:number) { 
    var data = {
      pagination: {
        page: currPage,
        size: pageSize
      }
    };             
    return this.backendService.post(this.path + '/events', data);
  }

  deleteEvent(eventId) {    
    return this.backendService.get(this.path + '/delete/'+ eventId);
  }

  getEventbyId(eventId) {               
    return this.backendService.get(this.path + '/'+ eventId);
  }

  getTags() {               
    return this.backendService.get(this.path + '/tags');
  }

  saveEventConfiguration(eventId:any,emailEnable:boolean,emailtemplate:any,smsEnable:boolean,smsContent:any, emailsubject:any) {
     
    return this.backendService.post(this.path + '/saveeventconfig', {eventid: eventId, 
      email_enable: emailEnable,
      emailsubject: emailsubject,
      email_template: emailtemplate, 
      sms_enable: smsEnable, 
      sms_content: smsContent});
  }
  
  getEventConfigByEventId(eventId) {               
    return this.backendService.get(this.path + '/event/'+ eventId);
  }

}
