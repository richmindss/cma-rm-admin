import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class ExamSelectionService {

  constructor(private backendService:BackendService) { }
  
  private path = '/exam-selection';
  

  saveExamSelection(examselect: any){
    
    return this.backendService.post (this.path + '/' ,{examselect:examselect});
  }


  getExamSelection(){
    
    return this.backendService.get ("/exam-selection/");
  }


}