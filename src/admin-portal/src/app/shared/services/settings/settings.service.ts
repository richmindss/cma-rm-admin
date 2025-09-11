import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private backendService:BackendService) { }

 
  getMenu (){
    return this.backendService.get ("/settings/menu");
  }

  setHallTicket (x){
    return this.backendService.post ("/settings/hallticket", {enable: x});
  }

  setScroll (txt){
    return this.backendService.post ("/settings/scroll", {scroll: txt});
  }

  setPoweredBymsg (txt){
    return this.backendService.post ("/settings/poweredBy", {poweredByMsg: txt});
  }

  setHeaderPreference (pref){
    return this.backendService.post ("/settings/header", {banner_type: pref});
  }

  saveSettings (setting){
    return this.backendService.post ("/settings", setting);
  }

  getSettings (){
    return this.backendService.get ("/settings");
  }

  savePasswordSetting (data){
    return this.backendService.post ("/settings/password", data);
  }

  getPasswordSetting (){
    return this.backendService.get ("/settings/password");
  }
}
