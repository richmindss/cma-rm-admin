import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExamListService } from "../../shared/services/exam-list/exam-list.service";
import * as moment from "moment";
import { first } from "rxjs/operators";
import { CoreService } from 'src/app/shared';
import Swal from "sweetalert2";



@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.component.html",
  styleUrls: ["./exam-list.component.scss"]
})
export class ExamListComponent implements OnInit {
  exams: any = [];
  appStartDateTime: any;
  appEndDateTime: any;
  examList: any;

  filter: any = {
    key: ""
  };

  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  examCount = 0;

  /** end pagination */

  constructor(
    private core: CoreService,
    private router: Router,
    private examListServiceApi: ExamListService
  ) { }

  ngOnInit() {
    this.getExams();
    this.getExamList();
  }

  addExam() {
    this.router.navigate(["admin/exam/new"]);
  }

  getExams() {
    this.examListServiceApi
      .getExams()
      .pipe(first())
      .subscribe(res => {
        this.exams = res;
      });
  }

  getFormatDateTime(xdate, xtime) {
    if (xdate) {


      let d = moment(xdate, this.core.dateFormat())
        .add(xtime.hour, "hour")
        .add(xtime.minute, 'minute');

      // var d = new Date(year, month, day, xtime.hour, xtime.minute);
      return moment(d).format("DD MMM YYYY hh:mm A");
    } else {
      return "";
    }
  }

  onEdit(id) {
    this.router.navigate(["admin/exam/" + id]);
  }

  deleteExam(id) {


    Swal.fire({
      title: "Are you sure?",
      text: "Exam will be deleted",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deleted it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        this.examListServiceApi
        .deleteExam(id)
        .pipe(first())
        .subscribe(res => {
          this.exams = res;
          this.getExams();
        });
           
      }  
    });


   
  }

  getExamList() {
    this.examListServiceApi
      .getExamList(this.currentPage, this.pageSize, this.filter)
      .pipe(first())
      .subscribe(res => {
        this.examCount = res["count"];
        this.exams = res["data"];
      });
  }

  fetchUserData(e) {
    this.currentPage = e;
    this.getExamList();
  }
}
