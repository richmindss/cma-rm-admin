
import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UploadScoreService {

  private path = '/reports';
  constructor(private backendService: BackendService) { }

  saveCandidateScore(records) {
    console.log("records",records);
  return this.backendService.post(this.path + '/storeRecords', records);
  }

  
}

