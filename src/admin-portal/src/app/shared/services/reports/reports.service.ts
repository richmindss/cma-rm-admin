import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private path = '/reports';

  constructor(private backendService:BackendService) { }


  getReport (data:any){
    return this.backendService.post (this.path, data);
  }

}
