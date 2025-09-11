import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationReportService {

  constructor(private backendService: BackendService) { }

  private path = '/reports';

  getRegistrationReport(currPage:number, pageSize:number, filter:any) {
    var data = {
      pagination: {
        page: currPage,
        size: pageSize
      },
      filter: filter
    };
    return this.backendService.post(this.path + '/registration-report', data);
  }

 

  getApplicationReport(currPage:number, pageSize:number, examid:any, appstatus:any) {
    var data = {
      pagination: {
        page: currPage,
        size: pageSize,
       },       
       examid:examid,
       appstatus:appstatus
    };
    return this.backendService.post(this.path + '/appreport' ,data);
  }

  getExam(){
    return this.backendService.get(this.path);
  }
  getCandidateReport(currPage:number, pageSize:number, filterData){
    var data = {
      pagination: {
        page: currPage,
        size: pageSize,
       },       
       filterData: filterData
    };
    return this.backendService.post(this.path + '/candidatereport' ,data);
  }

  exportReport(filterData: any) {
    var data = {
      pagination: {
        page: 1,
        size: 25,
       },       
       filterData: filterData
    };
    return this.backendService.post(this.path + '/reportexport',data);
  }

  getAllReports (currPage:number, pageSize:number){
    var data = {
      pagination: {
        page: currPage,
        size: pageSize,
       }
    };
    return this.backendService.post(this.path + '/allreports',data);
  }
  downloadReport(reportId:any){
    return this.backendService.get(this.path + '/downloadreport/'+ reportId);
  }


}