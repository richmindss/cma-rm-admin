import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateStatusCountService {

  private path = '/candidate-status-count';

  constructor(private backendService :BackendService ) { }

  getRegisteredCandidate() {
    
    return this.backendService.get(this.path);
  }

  getAppSubmittedStatus() {
    
    return this.backendService.get(this.path + '/sub');
  }

 
}
