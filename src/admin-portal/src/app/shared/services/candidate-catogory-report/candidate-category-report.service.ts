import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateCatogoryReportService {

  private path = '/report';

  constructor(private backendService: BackendService) { }


  getReportData(filter){
    return  this.backendService.post (this.path + "/", filter);
   }


}
