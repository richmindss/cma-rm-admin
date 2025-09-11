import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CandidateListService } from "../../../shared/services/candidate-list/candidate-list.service";
import { first } from "rxjs/operators";
import { AuthenticationService, BackendService, CondidateViewService } from 'src/app/shared';

@Component({
  selector: "app-candidate-details",
  templateUrl: "./candidate-details.component.html",
  styleUrls: ["./candidate-details.component.scss"]
})
export class CandidateDetailsComponent implements OnInit {
  candidateId: any;
  candidate: any= {};
  exam:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private candidateApi: CandidateListService,
    private backEndServcie: BackendService,
    private candidateViewService:CondidateViewService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.candidateId = params.get("id");
      this.getCandidateDetailsById();
      this.getCandidateExam ();
    });
  }


  getCandidateExam (){
    this.candidateViewService.getExams(this.candidateId)
    .pipe(first())
    .subscribe(res => {
       
      this.exam = res;
      
       
    });
  }
  getCandidateDetailsById() {
    this.candidateApi
      .getCandidateDetailsById(this.candidateId)
      .pipe(first())
      .subscribe(res => {
        this.candidate = res || {};
      });
  }

  onBack() {
    this.router.navigate(["admin/candidate-list"]);
  }

  onDownload() {
  }

  downloadHallTicket (){

 
    var url = this.backEndServcie.getBasePath () +  this.candidateApi.downloadHallTicket (this.candidateId);
    url += "?token=" + this.auth.getAuthToken ();
    url += "&appname=rm-admin&usertype=admin"
    //console.log ("url ...", url);

    //appname=rm-admin&usertype=admin
    
    window.open (url);
  }

  verifyCandidate (){
    var examID= "";
    if(this.exam && this.exam.length >0){
      examID = this.exam [0].examid;
    }
    this.router.navigate (["admin/application-verification-view/"+ this.candidateId + "/" + examID]);
  }

  verifyPayment (){
    var examID= "";
    if(this.exam && this.exam.length >0){
      examID = this.exam [0].examid;
    }
    this.router.navigate (["admin/payments/"+ examID + "/users/" + this.candidateId]);
  }
}
