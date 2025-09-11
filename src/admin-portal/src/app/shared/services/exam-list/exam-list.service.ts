import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})
export class ExamListService {

  private path = '/exams';

  constructor(private backendService: BackendService) { }

  getExamList(currPage:number, pageSize:number, filter:any) {
    
    var data = {
      pagination: {
        page: currPage,
        size: pageSize
      },
      filter:filter
    };
    return this.backendService.post(this.path + "/search", data);
  }


  saveExam(examdetails:any) {
  
    return this.backendService.post(this.path + '/save',{examdetails:examdetails});
 
   }              
   
   getExams() {        
   
    return this.backendService.get(this.path);
  }

  deleteExam(id) {    
    
    return this.backendService.get(this.path + '/' + id + '/delete');
  }

  getExambyId(id) {        
       
    return this.backendService.get(this.path + '/'+ id);
  }  

  saveCostInfo(costinfodetails:any) {
    return this.backendService.post(this.path + '/savecost', costinfodetails);
 
   } 
    
   getExamCostInfo(examid) {        
  
    return this.backendService.get(this.path +'/' + examid + '/costinfo');
  }

  deleteExamCostInfo(id) {    
    
    return this.backendService.get(this.path +'/' + id + '/costinfo/delete');
  }

  getExamCostInfobyId(id) {        
       
    return this.backendService.get(this.path + '/' + id + '/costinfobyid');
  } 
}
