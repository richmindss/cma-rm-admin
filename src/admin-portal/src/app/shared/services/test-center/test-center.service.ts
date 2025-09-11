import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})
export class TestcenterService {


  private path = '/testcenter';

  constructor(private backendService: BackendService) { }

 
  getStates (){
    return this.backendService.get(this.path + "/state");
  }

  saveTestcenter(testLocation) {

    return this.backendService.post(this.path + "/save", testLocation);

  }

  getTestcenter() {

    return this.backendService.get(this.path);
  }

  deleteTestcenter(locationId) {

    return this.backendService.get(this.path + '/' + locationId + '/delete');
  }

  getTestcenterbyId(testcenterid) {
    return this.backendService.get(this.path + '/' + testcenterid);
  }
  saveImportTestcenter(testcenterdata) {
    return this.backendService.post(this.path + '/import', testcenterdata);
  }

  searchUploadTestCenterList(currPage: number, pageSize: number, filter: any) {

    var data = {
      pagination: {
        page: currPage,
        size: pageSize
      },
      filter: filter
    };

    return this.backendService.post(this.path + "/search", data);

  }



}