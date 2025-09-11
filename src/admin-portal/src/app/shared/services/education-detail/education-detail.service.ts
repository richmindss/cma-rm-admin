import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class EducationDetailService {

  private path = '/education-details';
  

  constructor(private backendService: BackendService) { }


  saveEducationDetail(edudetails:any) {
    
    return this.backendService.post(this.path, edudetails);
 
   }              
   
   getEducationDetail() {        
      
    return this.backendService.get(this.path);
  }

  deleteEducationDetail(id) {    
    
    return this.backendService.get(this.path + '/' + id + '/delete');
  }

  getEducationDetailbyId(id) {        
   
    return this.backendService.get(this.path + '/'+ id);
  }
    

 

}
