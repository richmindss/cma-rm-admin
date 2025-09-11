import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AppTabService {


  private path = '/app-tabs';

  constructor(private backendService: BackendService) { }


  loadAll  (){
    return this.backendService.get (this.path);
  }


  handleActive  (tab){
    return this.backendService.post (this.path + "/active", {
      code: tab.code,
      active: tab.active
    });
  }


  handleSequence  (tab1, tab2){
    return this.backendService.post (this.path + "/sequence", {
      code1: tab1.code,
      sequence1: tab1.sequence,
      code2: tab2.code,
      sequence2: tab2.sequence
    });
  }

}
