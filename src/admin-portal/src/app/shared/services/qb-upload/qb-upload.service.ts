import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../core/core.service';

@Injectable({providedIn: 'root'})

export class QbUploadService {
private basePath = '';
  constructor(private backendService:BackendService,private http: HttpClient,  private coreProvider: CoreService) {  this.basePath = this.coreProvider.getRootPath();}
  
  private path = '/uploadQb';
  
  saveQuestionBank(formData: File){
    return this.backendService.post (this.path + '/save-qb' ,formData);
  }

  getQuestionSummary(){
    return this.backendService.get(this.path + '/getQuestionSummary')
  }

   getQuestions(){
    return this.backendService.get (this.path + "/getQuestions");
  }

  deleteQuestionBank (){
    return this.backendService.get (this.path + "/deleteQuestionBank");
  }

  sentForReviewQuestion(status:string,id:string){
    return this.backendService.post (this.path + '/review-question' ,{status:status,id:id});
  }

  updateQuestionBank(qbid:any,type:any,content:any) {
   
    return this.backendService.post(this.path + "/update-qb", {
      qbid:qbid,
      type:type,
      content:content
    });
  }

 downloadZip(): Observable<Blob> { 
  console.log(this.basePath);
  return this.http.get(this.basePath+this.path+ "/generationQb", {
    responseType: 'blob'  // 👈 important
  });
}

  questionSelection(id:any,checkedVal:any){
  return this.backendService.post(this.path + "/questionSelection", {
        id:id,
        checkedVal:checkedVal
  });
  }

}