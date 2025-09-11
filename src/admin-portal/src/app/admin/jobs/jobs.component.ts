import { Component, OnInit } from "@angular/core";
import { CandidateJobsService } from "../../shared/services/candidate-jobs/candidate-jobs.service";
import * as moment from "moment";
import { AlertService } from "../../shared/services/alert/alert.service";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";
@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"]
})
export class JobsComponent implements OnInit {
  userlist: any;
  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  userCount = 0;

  sender = "jobs";

  /** end pagination */
  filter: any = {
    key: ""
  };

  createddate: any;
  createdtime: any;

  job_type: any = {
    createddate: "",
    createdtime: { hour: 0, minute: 0 }
  };
  jobsResult: any = [];
  detailResult: any = [];
  today: Date;

  constructor(
    private jobsApi: CandidateJobsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.listJobs();
  }

  candidateExport() {
    this.job_type = "CANDIDATE_EXPORT";
    this.jobsApi
      .saveCandidateJobs(this.job_type)
      .pipe(first())
      .subscribe( (res:any) => {

        if (res && res.status == "error"){
          this.alertService.e (res.message);
          return;
        }
        this.alertService.show(this.sender, "Records exported sucessfully.");
        this.listJobs();
      });
  }


  sendHallTicket (){
      
    Swal.fire({
      title: "Are you sure?",
      text: "This will send email to all candidates",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, send email!",
      cancelButtonText: "No, I will do later"
    }).then(result => {
      if (result.value) {
         
           
   

    this.jobsApi
      .saveCandidateJobs("HALL_TICKET_EMAIL")
      .pipe(first())
      .subscribe( (res:any) => {

        if (res && res.status == "error"){
          this.alertService.e (res.message);
          return;
        }
        this.alertService.show(this.sender, "Email will be sent soon.");
        this.listJobs();
      });
    }  
  });
  }

  listJobs() {
    this.jobsApi
      .getCandidateJobs(this.currentPage, this.pageSize, this.filter)
      .pipe(first())
      .subscribe( (res:any) => {
        this.jobsResult = res.jobs;
        this.userCount = res.count;
      });
  }
  fetchUserData(e) {
    this.currentPage = e;

    this.listJobs();
  }
  getFormatDate(xdatetime) {
    if (xdatetime) {
      return moment(xdatetime).format("DD-MM-YYYY hh:mm A");
    } else {
      return "";
    }
  }
}
