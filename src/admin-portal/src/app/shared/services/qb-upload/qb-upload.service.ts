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

  sentForReviewQuestion(id:string){
    return this.backendService.post (this.path + '/review-question' ,{id:id});
  }
}