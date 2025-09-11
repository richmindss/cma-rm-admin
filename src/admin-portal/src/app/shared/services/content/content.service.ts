import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  
  private path = '/content';
  
 
 
  
  constructor(private backendService: BackendService) { }


  
  
  
    saveContent(contentMode:string, contenttype: string, date:any, time:any, timeZone: any) {

      
        return this.backendService.post(this.path, 
              {content_mode:contentMode, 
                content_type: contenttype, date:date, 
                time:time, 
                time_zone: timeZone});
    }

    getContent(contenttype:any) {
        return this.backendService.post(this.path + "/types", {content_type:contenttype});
    }
  
  
    saveContentLanguage(contentMode:string, contenttype: string,  language:any, content:any) {
     
    return this.backendService.post(this.path + '/language', {text: content,
                                   content_type:contenttype,
                                   content_mode: contentMode,
                                   language: language
                                     });
  }

  getContentLanguage(contentMode:string, contenttype: string,  language:any) {
     
    return this.backendService.post(this.path + '/language/find', {
                                   content_type:contenttype,
                                   content_mode: contentMode,
                                   language: language
                                     });
  }

   




}