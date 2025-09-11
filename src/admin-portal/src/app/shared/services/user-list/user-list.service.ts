import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private path = '/users'; 
  constructor(private backendService: BackendService ) { }

  saveUserList(userList) {     
    
    return this.backendService.post(this.path +"/saveUser", userList);
  }

  getUserList() {
    return this.backendService.get(this.path + "/getUserList");
  }

  getUserDetails(userId) {
    
    return this.backendService.get(this.path + '/'+ userId);
  }

  deleteUserList(userid) {
    
    return this.backendService.get(this.path + '/'+ userid + '/delete');
  }

   
}
