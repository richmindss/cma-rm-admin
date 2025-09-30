import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private path = '/admin/users'; 
  constructor(private backendService: BackendService ) { }

  saveUserList(userList) {     
    
    return this.backendService.post(this.path +"/saveUser", userList);
  }

  getUserList() {
    return this.backendService.get(this.path + "/getUserList");
  }

  getUserDetails(userId) {
    
    return this.backendService.get(this.path + "/getUser/"+ userId);
  }

  updateUser(userData:any){
    return this.backendService.post(this.path +"/updateUser", userData);
  }

  deleteUserList(userid) {
    
    return this.backendService.get(this.path + '/deleteUser/'+ userid);
  }

  getSubjectList(){
    return this.backendService.get(this.path + "/getSubject");
  }

  getExamsList(){
    return this.backendService.get(this.path + "/getExamsList");
  }

  getUserType(){
    return this.backendService.get(this.path + "/getUserType");
  }

  saveUserMap(mapUser:any){
    return this.backendService.post(this.path +"/saveUserMap", mapUser);
  }   

  getUserMappingList() {
    return this.backendService.get(this.path + "/getUserMappingList");
  }

  getUserMapperDetails(userId:string){
    return this.backendService.get(this.path + "/getMappedUser/"+ userId);
  }

  updateMappedUser(userData:any){
    return this.backendService.post(this.path +"/updateMappedUser", userData);
  }
  
}
