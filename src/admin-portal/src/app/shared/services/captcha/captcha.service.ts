import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';
@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private backendService: BackendService) { }

  getCaptcha (page:any){
    return this.backendService.post ("/captcha/page", {page: page});
  }
}
