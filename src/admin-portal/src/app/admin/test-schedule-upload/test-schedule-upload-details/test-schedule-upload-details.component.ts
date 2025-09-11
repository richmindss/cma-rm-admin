import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../shared/services/alert/alert.service";
import { TestscheduleService } from "../../../shared/services/test-schedule/test-schedule.service";
import Swal from "sweetalert2";
import { CoreService } from "../../../shared/services";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-test-schedule-upload-details',
  templateUrl: './test-schedule-upload-details.component.html',
  styleUrls: ['./test-schedule-upload-details.component.scss']
})
export class TestScheduleUploadDetailsComponent implements OnInit {



  testscheduleId: any;
  sender = "test-schedule-upload";
  error = "";
  testschedule: any = {

    can_userid: "",
    can_examid: "",
    testcenterid: "",
    testdate: "",
    teststarttime: "",
    examduration: "",
    reportingduration: "",



  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private testscheduleService: TestscheduleService,
    private coreService: CoreService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.testscheduleId = params.get("id"); 
      if (!this.isNew()) {
        this.getTestscheduleById();
      }
    });
  }
  isNew() {
    return this.testscheduleId == "new";
  }

  onDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "Test Schedule Upload data will be deleted. This action can't be reversed!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        this.testscheduleService
          .deleteTestschedule(this.testscheduleId)
          .pipe(first())
          .subscribe(res => {
            this.onCancel();
          });
      }
    });
  }

  onCancel() {
    this.router.navigate(["admin/test-schedule-upload"]);
  }

  getTestscheduleById() {
    this.testscheduleService
      .getTestscheduleById(this.testscheduleId)
      .pipe(first())
      .subscribe(res => {
        console.log("res----------",res);
        this.testschedule = res;
      });
  }

  onSave() {
    if (!this.testschedule.can_userid) {
      this.alertService.err(this.sender, "candidate userid can not be blank");
      return false;
    }
    if (!this.testschedule.can_examid) {
      this.alertService.err(this.sender, "candidate examid  can not be blank");
      return false;
    }
    if (!this.testschedule.testcenterid) {
      this.alertService.err(this.sender, "testcenterid can not be blank");
      return false;
    }
    if (!this.testschedule.testdate) {
      this.alertService.err(this.sender, "testdate can not be blank");
      return false;
    }
    if (!this.testschedule.teststarttime) {
      this.alertService.err(this.sender, "teststarttime can not be blank");
      return false;
    }
    if (!this.testschedule.examduration) {
      this.alertService.err(this.sender, "examduration can not be blank");
      return false;
    }
    if (!this.testschedule.reportingduration) {
      this.alertService.err(this.sender, "reportingduration can not be blank");
      return false;
    }

    this.testscheduleService.saveTestschedulDetails
      (this.testschedule)
      .pipe(first())
      .subscribe(res => {
        if (res["status"] == "error") {
          this.alertService.err(this.sender, res["message"]);
          return;
        }
        this.alertService.show(this.sender, "TestSchedule Data Saved");
        setTimeout(() => {
          this.router.navigate(["admin/test-schedule-upload"]);
        }, 1000);
      });
  }

 
}
