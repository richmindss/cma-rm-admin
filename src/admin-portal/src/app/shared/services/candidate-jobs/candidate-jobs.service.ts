import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})

export class CandidateJobsService {

  
  private path = '/jobs';
  

  constructor(private backendService: BackendService) { }

  
  saveCandidateJobs(job_type) {
 
    return this.backendService.post(this.path , {data : job_type});
  }
   
  getCandidateJobs(currentPage:number, pageSize:number, filter:any) {
    
    return this.backendService.post(this.path +'/job', {page:currentPage, size:pageSize, filter:filter} );
  }

}
