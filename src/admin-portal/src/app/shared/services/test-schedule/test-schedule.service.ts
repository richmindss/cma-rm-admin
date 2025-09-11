import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})

export class TestscheduleService {

  private path = '/testschedule';

  constructor(private backendService: BackendService) { }

  saveTestschedule(testscheduledata) {
    return this.backendService.post(this.path + '/import', testscheduledata);
  }

  saveTestschedulDetails(data) {
    return this.backendService.post(this.path + "/", data);
  }

  searchTestschedule(currPage: number, pageSize: number, filter: any) {
    var data = {
      pagination: {
        page: currPage,
        size: pageSize
      },
      filter: filter
    };

    return this.backendService.post(this.path + "/search", data);
  }

  deleteAll(testschedule) {
    return this.backendService.post(this.path + "/delete", testschedule);
  }

  getTestscheduleById(testscheduleId) {
    return this.backendService.get(this.path + "/" + testscheduleId);
  }

  deleteTestschedule(id) {
    return this.backendService.post(this.path + "/" + id + "/delete", {});
  }
}