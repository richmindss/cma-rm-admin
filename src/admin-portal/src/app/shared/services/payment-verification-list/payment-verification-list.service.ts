import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentVerificationListService {

  constructor(private backendService:BackendService) { }
  
  private path = '/payment-vefication-list';
  
  getPaymentStatus(status:any,examid:any,currPage:number, pageSize:number, filter:any){
    var data = {
      pagination: {
        page: currPage,
        size: pageSize
      },
      filter:filter,
      statuscode:status.code,
      examid: examid
    };
    return this.backendService.post(this.path +'/search' ,data);
  }

  updateVerifiedStatus(s){
    return this.backendService.post(this.path +'/update', s);

  }

  getPaymentStatusList(){
    return this.backendService.get(this.path + '/pay');

  }
}