import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateListService {

  private path = '/candidates';

  constructor(private backendService: BackendService) { }

  getCandidateList(currPage: number, pageSize: number, filter: any) {

    var data = {
      pagination: {
        page: currPage,
        size: pageSize
      },
      filter: filter
    };

    return this.backendService.post(this.path , data);
  }


  getCandidateDetailsById(centerid) {

    return this.backendService.get(this.path + '/' + centerid + '/candetails' );
  }

  downloadHallTicket (candidate){
    return    this.path + '/' + candidate + '/hallticket' ;
  }


}
