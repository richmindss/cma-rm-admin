import { Component, OnInit } from "@angular/core";
import { CondidateViewService } from "../../shared/services/candidate-view/candidate-view.service";
import * as moment from "moment";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { CoreService, AuthenticationService } from "src/app/shared/services";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";

@Component({
  selector: "app-application-verification-view",
  templateUrl: "./application-verification-view.component.html",
  styleUrls: ["./application-verification-view.component.scss"]
})
export class ApplicationVerificationViewComponent implements OnInit {
  cityResult: any = {};
  eligiblityResult: any = {};
  eligiblity: any;
  eligiblityArray: any = {};
  docArray: any = {};
  occudetail: any;
  docList: any = [];
  reject_reason: any = "";
  approve: any = {};
  reject: any = {};
  status: boolean = false;
  application:any;
  private _success = new Subject<string>();
  private _error = new Subject<string>();

  //alerts
  errorMessage = null;
  successMessage = null;

  userid: any;
  examid: any;
  profResult: any = [];
  educationalResult: any = {};
  eduList = [];
  profileResult: any = {};
  occupationalResult: any = [];
  currentoccstatus: any = {};
  documentResult: any = {};
  gradeResult: any;
  profQualResult: any;
  docDetails: any;
  docTypes: any;
  occuResult: any;
  userStatus: any;
  currentStatus: any;
  img_width: any = 100;
  exams:any = [];

  constructor(
    
    private coreService: CoreService,
    private constantApi: ConstantService,
    private candidateViewService: CondidateViewService,
    private authenticationService: AuthenticationService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.initAlert();
    this.router.paramMap.subscribe(params => {
      this.userid = params.get("userid");
      this.examid = params.get("examid");

      this.personalDetails(this.userid);
      this.eduDetails(this.userid);
      this.getProfDetails(this.userid);
      this.getOccupationalStatus(this.userid);
      this.getOccupationalDetails(this.userid);
      this.getPreferedCity(this.userid);
      this.getEligiblityCriteria(this.userid);
      this.loadDocTypes();
      this.getGrade();
      this.getProfQual();
      this.getOccuStatus();
      this.loadDocDetails(this.userid);
      this.getDocList(this.userid);
      this.getUserStatus(this.userid, this.examid);
      this.getExams (this.userid);
      this.getApplication ();
    });
  }


  getExperience (){
    this.candidateViewService.getCandidateExperience({userid:this.userid})
    .pipe (first())
    .subscribe ( (res:any) =>{

      this.currentoccstatus.noofexp = res.message;
    });
  }

  getApplication (){
    this.candidateViewService.getApplication({userid: this.userid, examid: this.examid})
    .pipe(first())
    .subscribe(res => {
      this.application = res;
      
    });
  }

  getExams (userid){
    this.candidateViewService.getExams(userid)
    .pipe(first())
    .subscribe(res => {
      this.exams = res;
      
    });
  }

  getUserStatus(userId, examId) {
    this.candidateViewService.getUserStatus(userId, examId)
      .pipe(first())
      .subscribe(res => {
        this.userStatus = res;
        this.currentStatus = this.userStatus.statuscode;
      });
  }

  getDocList(userId) {
    this.candidateViewService.getDocList(userId)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.docList = res;
          for (var i = 0; i < this.docList.length; i++) {
            this.docList[i]["url"] = this.getImgUrl(this.docList[i].doctype);
            this.docList[i]["name"] = this.getDocName(this.docList[i].doctype);
          }
        }
      });
  }

  initAlert() {
    this._success.subscribe(message => (this.successMessage = message));
    this._success
      .pipe(debounceTime(2000))
      .subscribe(() => (this.successMessage = null));

    this._error.subscribe(message => (this.errorMessage = message));
    this._error
      .pipe(debounceTime(2000))
      .subscribe(() => (this.errorMessage = null));
  }

  getDocName(type) {
    if (type == "candidate_photo") {
      return "Candidate Photo";
    } else if (type == "candidate_signature") {
      return "Candidate Signature";
    } else if (type == "candidate_age_proof") {
      return "Candidate Age Proof";
    } else if (type == "candidate_address_proof") {
      return "Candidate Address Proof";
    }  else if (type == 'candidate_ews_cert') {
      return 'Candidate EWS Certificate'
    }
    else if (type == 'candidate_pwd_cert') {
      return 'Candidate PWD Certificate'
    }
    else if (type == 'candidate_apprentice') {
      return 'Candidate Apprecentice Certificate'
    }
    else if (type == 'candidate_cast_cert') {
      return 'Candidate Caste Certificate'
    }
    else if (type == 'candidate_iti_cert') {
      return 'Candidate ITI Certificate'
    }
    else if (type == 'candidate_misc_cert') {
      return 'Misc Category'
    }
  }

  getUrl(id) {
    return this.getImgUrl(id);
  }

  personalDetails(userid) {
    this.candidateViewService.getPersonalDetailsByUserid(userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.profileResult = res;
        }
      });
  }

  eduDetails(userid) {
    this.candidateViewService.getEduDetailsByUserid(userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.educationalResult = res;

          if (this.educationalResult) {
            this.eduList = this.educationalResult.subjects;
          }
        }
      });
  }

  
  getProfDetails(userid) {
    this.candidateViewService.getProfDetailsByUserid(userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.profResult  = res;
        }
      });
  }

  getPreferedCity(userid) {
    this.candidateViewService.getPreferedCity(userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.cityResult = res;
        }
      });
  }

  getOccupationalDetails(userid) {
    this.candidateViewService.getOccupationalDetailsByUserid(userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
         
          this.occudetail = res; 
 
           
        }
      });
  }

  getEligiblityCriteria(userid) {
    this.candidateViewService.getEligiblityCriteria(userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.eligiblityArray = res;

          this.eligiblityResult = this.eligiblityArray.answers;
        }
      });
  }

  getOccupationalStatus(userid) {
    this.candidateViewService.getOccupationalStatusByUserid(userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.currentoccstatus = res;
          if (!this.currentoccstatus.noofexp){
            this.getExperience ();
          }
        }
      });
  }

  loadDocDetails(userid) {
    this.candidateViewService.getDocDetails(userid)
      .pipe(first())
      .subscribe(res => {
        this.docDetails = res;

        if (this.docTypes && this.docDetails) {
          for (var i = 0; i < this.docTypes.length; i++) {
            var doc = this.docTypes[i];
            if (this.docDetails.age_doc) {
              if (doc._id == this.docDetails.age_doc.doc_type) {
                this.docDetails.age_doc.name = doc.name;
              }
            }

            if (this.docDetails.addr_doc) {
              if (doc._id == this.docDetails.addr_doc.doc_type) {
                this.docDetails.addr_doc.name = doc.name;
              }
            }
          }
        }
      });
  }

  getGrade() {
    this.constantApi
      .getConstantValue("GRADE")
      .pipe(first())
      .subscribe(res => {
        this.gradeResult = res;
      });
  }

  loadDocTypes() {
    this.constantApi
      .getConstantValue("DOCUMENTTYPE")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.docTypes = res;
        }
        this.loadDocDetails(this.userid);
      });
  }

  getRand() {
    var d = new Date();
    return d.getHours() + "-" + d.getSeconds() + "--" + d.getMilliseconds();
  }

  getImgUrl(id) {
    var t = 10;// this.getRand();
    var url = this.coreService.getRootPath() + "/document/id/" + id;
    url += "?t=" + t;
    url += "&appname=" + this.coreService.getAppName();
    url += "&usertype=" + this.coreService.getUserType();
    url += "&candidateid=" + this.authenticationService.getAuthToken();

    return url;
  }

  getProfQual() {
    this.constantApi
      .getConstantValue("PROFESSIONALQUALIFICATION")
      .pipe(first())
      .subscribe(res => {
        this.profQualResult = res;
      });
  }

  fillGradeName(s) {
    var name = this.getName(this.gradeResult, s.grade, null);

    return name ? name : "";
  }

  fillProfQualName(s) {
    var name = this.getName(this.profQualResult, s.profqual, null);

    return name;
  }

  getName(codes, id, field) {
    if (!codes) {
      return "";
    }
    for (var i = 0; i < codes.length; i++) {
      if (codes[i]._id == id || codes[i].code == id) {
        if (field) {
          return codes[i][field];
        }
        return codes[i]["name"];
      }
    }
    return "";
  }

  getDate(vdate) {
    if (vdate) {
      return moment(vdate).format("MMM D, YYYY");
    } else {
      return "";
    }
  }

  getOccuStatus() {
    this.constantApi
      .getConstantValue("CURRENTEMPLOYMENTSTATUS")
      .pipe(first())
      .subscribe(res => {
        this.occuResult = res;
      });
  }

  onApprove() {
    this.approve.examid = this.examid;
    this.approve.userid = this.userid;
    this.candidateViewService.saveApproveStatus(this.approve)
      .pipe(first())
      .subscribe(res => {
        this._success.next("Approved successful..");
        this.status = true;
        this.getUserStatus (this.userid, this.examid);
      });
  }

  onReject() {
    if (!this.reject_reason) {
      this._error.next("Please enter reason for reject...");
      return;
    }
    this.reject.examid = this.examid;
    this.reject.userid = this.userid;
    this.reject.reject_reason = this.reject_reason;
    this.candidateViewService.saveRejectStatus(this.reject)
      .pipe(first())
      .subscribe(res => {
        this._success.next("Rejected successfully..");
        this.getUserStatus (this.userid, this.examid);
      });
  }

  onClose() {
    this.route.navigate(["admin/application-verification-list"]);
  }

  getCountry (add){
    if (add.country && add.country.id == "OTHERS"){
      return add.country_other;
    }else if (add.country && add.country.id != "OTHERS"){
      return add.country.name;
    }
    return "";
  }

  getState (add){
    if (add.country && add.country.id == "OTHERS"){
      return add.state_other;
    }else if (add.country && add.country.id != "OTHERS"){
      return add.state;
    }
    return "";
  }

  getDistrict (add){
    if (add.country && add.country.id == "OTHERS"){
      return add.district_other;
    }else if (add.country && add.country.id != "OTHERS"){
      return add.district.district;
    }
    return "";
  }

    verifyPayment (examID:any){
    this.route.navigate (["admin/payments/"+ examID + "/users/" + this.userid]);
  }
}
