import { Injectable } from '@angular/core'; 
import { CoreService } from '../core/core.service';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  
  private basePath = '';

  constructor(private http: HttpClient, 
      private coreProvider: CoreService) {
    this.basePath = this.coreProvider.getRootPath();
  }

  getBasePath (){
    return this.coreProvider.getRootPath ();
  }

  public get(path: string) {
  
    return this.http.get (this.basePath + path);
  }


  public post (path: string, data: any) {

    return this.http.post (this.basePath + path, data);
  }
}
