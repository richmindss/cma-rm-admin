import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private path = '/import-configuration';
  constructor(private backendService: BackendService) { }

saveImportState(statedata) {   
  return this.backendService.post(this.path + '/state', statedata);
  }

saveImportDistrict(districtdata) {    
  return this.backendService.post(this.path + '/district', districtdata);
  } 
}
