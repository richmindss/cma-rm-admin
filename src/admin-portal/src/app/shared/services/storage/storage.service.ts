import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public save (key: string, data: any) {
    if (!data) {
      sessionStorage.removeItem (key);
      return;
    }
    sessionStorage.setItem (key, JSON.stringify (data));
  }

  public get (key: string) {
    const data =  sessionStorage.getItem (key);
    if (!data) {
      return data;
    }
    return JSON.parse (data);
  }

  public clear() {
    sessionStorage.clear(); // or localStorage.clear();
  }
}
