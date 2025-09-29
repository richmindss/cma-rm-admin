import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({providedIn: 'root'})

export class QbUploadService {

  constructor(private backendService:BackendService) { }
  
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
    console.log(qbid,type,content)
    return this.backendService.post(this.path + "/update-qb", {
      qbid:qbid,
      type:type,
      content:content
    });
  }
}