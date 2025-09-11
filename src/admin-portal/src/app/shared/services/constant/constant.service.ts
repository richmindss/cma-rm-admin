import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service' ;

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  private path = '/constant';
  constructor(private backendService : BackendService) { }

  getConstantValue(code) {
    
    return this.backendService.get(this.path + '/code/'+ code);
  }
  getVerificationStatus(code) {
    
    return this.backendService.get(this.path + '/code/'+ code);
  }

  getConstant(){
    return this.backendService.get(this.path );
  }

  saveConstantValue(data){
   
    return this.backendService.post(this.path + '/value/save', data);

  }

  saveConstant(data){
   
    return this.backendService.post(this.path + '/save', data);
  }

  getConstantValueByConstantId(constantid){
    return this.backendService.get(this.path + '/'+ constantid);
  }

  getContantById(constantid){
    return this.backendService.get(this.path + '/constant/'+ constantid);
  }

  deleteConstantValue(id) {
    return this.backendService.get(this.path + '/delete/'+ id);
  }

  deleteConstant(id) {
    return this.backendService.get(this.path + '/remove/'+ id);
  }

  searchConstant(search) {   
    return this.backendService.post(this.path + '/searchconst', {search:search});
  }
  searchConstantValue(search,constantid) {   
    return this.backendService.post(this.path + '/searchconstval', {search:search, constantid:constantid});
  }
}

