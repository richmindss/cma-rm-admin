import { Component, OnInit } from '@angular/core';
import { TestscheduleService } from "../../shared/services/test-schedule/test-schedule.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-test-schedule-upload',
  templateUrl: './test-schedule-upload.component.html',
  styleUrls: ['./test-schedule-upload.component.scss']
})
export class TestScheduleUploadComponent implements OnInit {

  filter: any = {
    key: ""
  };
  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  testscheduleCount = 0;
  doc: any;
  downloadurl = "";
  /** end pagination */
  testschedule: any = [];
  sender = "test-schedule-upload";
 
  constructor(
    private router: Router,
    private testscheduleService: TestscheduleService,
  ) { }

  ngOnInit() {
    this.searchTestschedule();
  }

  uploadCsrc() {
    this.router.navigate(["admin/upload-test-schedule"]);
  }

  OnClick(id) {
   // this.router.navigate(["admin/test-schedule-upload-details/" + id]);
  }

  onAdd() {
    this.router.navigate(["admin/test-schedule-upload-details/new"]);
  }

  searchTestschedule() {
    this.testscheduleService
      .searchTestschedule(this.currentPage, this.pageSize, this.filter)
      .pipe(first())
      .subscribe(res => {
      //  console.log("resssssssssssssssssssssss",res);
        this.testscheduleCount = res["count"];
        this.testschedule = res["data"];
      });
  }

  fetchexamData(e) {
    this.currentPage = e;
    this.searchTestschedule();
  }

  clear() {
    this.filter.key = "";
    this.searchTestschedule();
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
        Swal.fire("Deleted!", "Test Schedule Upload is deleted.", "success");
        this.testscheduleService
          .deleteAll(this.testschedule)
          .pipe(first())
          .subscribe(res => {
            this.searchTestschedule();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Test Schedule Upload is Not Deleted:)", "error");
      }
    });
  }

}
