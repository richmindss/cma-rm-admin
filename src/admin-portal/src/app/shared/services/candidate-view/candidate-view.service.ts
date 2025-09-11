

import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CondidateViewService {

  constructor(private backendService: BackendService) { }

  private path = '/candidates-view';



  getEligiblityCriteria(userid) {
    //console.log("getPreferedCity ",userid);

    return this.backendService.get(this.path + '/' + userid + '/eligiblitycriteria/');
  }

  getPreferedCity(userid) {


    return this.backendService.get(this.path + '/' + userid + '/preferedcity/');
  }


  getExams(userid) {


    return this.backendService.get(this.path + '/' + userid + '/exams');
  }


  getPersonalDetailsByUserid(userid) {


    return this.backendService.get(this.path + '/' + userid + '/personaldetail');
  }

  getEduDetailsByUserid(userid) {

    return this.backendService.get(this.path + '/' + userid + '/edudetaildetail');
  }
  getProfDetailsByUserid(userid) {

    return this.backendService.get(this.path + '/' + userid + '/profestionsldetail');
  }
  getOccupationalDetailsByUserid(userid) {

    return this.backendService.get(this.path + '/' + userid + '/occupationaldetail');
  }
  getOccupationalStatusByUserid(userid) {

    return this.backendService.get(this.path + '/' + userid + '/occupationalstatus');
  }
  getProfQualiByUserid(code, userid) {

    return this.backendService.get(this.path + { userid, code });
  }
  getOccuStatusByUserid(code, userid) {

    return this.backendService.get(this.path + { userid, code });
  }
  getGradeByUserid(code, userid) {

    return this.backendService.get(this.path + { userid, code });
  }
  getConstantByUserid(code, userid) {

    return this.backendService.get(this.path + { userid, code });
  }
  getDocDetails(userid) {

    return this.backendService.get(this.path + '/' + userid + '/details');
  }
  getDocList(userid) {
    return this.backendService.get(this.path + '/' + userid + '/list');
  }

  saveApproveStatus(approve: any) {
    return this.backendService.post(this.path + '/approve', approve);

  }

  saveRejectStatus(reject: any) {
    return this.backendService.post(this.path + '/reject', reject);
  }

  getUserStatus(userId, examId) {
    return this.backendService.get(this.path + '/status/' + userId + "/exam/" + examId);
  }



  rejectPayment(reject: any) {
    return this.backendService.post(this.path + '/rejectpayment', reject);
  }
  approvePayment(approve: any) {
    return this.backendService.post(this.path + '/approvepayment', approve);

  }

  getApplication(data: any) {
    return this.backendService.post(this.path + '/application', data);

  }
  getCandidateExperience(data: any) {
    return this.backendService.post(this.path + '/experience', data);

  }

  acceptPayment(data:any) {
    // {id: id, reason: reason}
    return this.backendService.post(this.path + '/acceptpayment',data);

  }

  
}