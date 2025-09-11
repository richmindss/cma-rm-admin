import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PdfStatusService {

  constructor(private backendService:BackendService) { }
  
  private path = '/pdf-status';
  
  getPdfStatus(filter:any , currPage:number, pageSize:number){
    var data = {
      filter: filter,
      pagination: {
        page: currPage,
        size: pageSize
      },
    };
    return this.backendService.post (this.path +"/status", data);
  }


}