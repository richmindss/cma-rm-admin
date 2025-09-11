import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private rootPath = environment.rootPath;
  private appName = "rm-admin";
  private userType = "admin";

  constructor() { }


  public getRootPath() {
    return this.rootPath;
  }

  public dateFormat() {
    return "DDMMYYYY";
  }


  public getAppName() {
    return this.appName;
  }

  public getUserType() {
    return this.userType;
  }

  public toDate(d) {
    return moment(d, this.dateFormat()).toDate();
  }

  public fromDate(d) {
    return moment(d).format(this.dateFormat());
  }

  public compareFn(a, b) {
    if (a && b && a._id && b._id) {
      return a._id == b._id;
    }

    if (a && b && a.code && b.code) {
      return a.code == b.code;
    }
    return false;
  }

  isNotDotAndNegeativeValue(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;

    if (
      charCode > 32 &&
      ((charCode < 33 || charCode > 44)) &&

      ((charCode < 47 || charCode > 126))
    ) {
      return false;
    }
    return true;
  }

  isNotSpecialCharAndAlphabet(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;

    if (
      charCode > 32 &&
      ((charCode < 48 || charCode > 57) &&
        (charCode < 97 || charCode > 122))
    ) {
      return false;
    }
    return true;
  }


  isNotAlphabet(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;

    if (
      charCode > 32 &&
      ((charCode < 33 || charCode > 64) &&
        (charCode < 91 || charCode > 125))
    ) {
      return false;
    }
    return true;
  }

  isAlphabet(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;

    if (charCode > 64 && charCode < 91) {
      return true;
    }
    return false;
  }


  public isNumeric(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isNumberhyphen(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
