import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})
export class UserDefinitionService {

  
  private path = '/user-definition';
  

  constructor(private backendService: BackendService) { }


  
  saveUserDefinition(type:string, useridlength: string,prefixvalue: string,suffixvalue: string) {
    
      return this.backendService.post(this.path + '/', {type:type, useridlength: useridlength, prefixvalue: prefixvalue, suffixvalue: suffixvalue});
      
  }

  getUserDefinition() {
    return this.backendService.get(this.path);
    
   }
 
}