import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})
export class ExamidGenrationService {

  
  private path = '/examid-generation';
  

  constructor(private backendService: BackendService) { }


  
  saveExamGenration(type:string, examidlength: string,prefixvalue: string,suffixvalue: string) {
    
      return this.backendService.post(this.path + '/', {type:type, examidlength: examidlength, prefixvalue: prefixvalue, suffixvalue: suffixvalue});
      
  }

  getExamgenration() {
    return this.backendService.get(this.path);
    
   }

   
  saveExamwiseGenration(examid:any,type:string, examidlength: string,prefixvalue: string,suffixvalue: string) {
    
    return this.backendService.post(this.path + '/examwise', {examid:examid, type:type, examidlength: examidlength, prefixvalue: prefixvalue, suffixvalue: suffixvalue});
    
}

getExamwisegenration(id) {  
  return this.backendService.get(this.path + '/examwiseid/'+ id);   
  
 }


 
}