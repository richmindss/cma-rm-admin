import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamListService } from "../../shared/services/exam-list/exam-list.service";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-exam-costinfo",
  templateUrl: "./exam-costinfo.component.html",
  styleUrls: ["./exam-costinfo.component.scss"]
})
export class ExamCostinfoComponent implements OnInit {
  examCostInfo: any = [];
  examId: any;
  @Input() feeType: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private examListService: ExamListService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examId = params.get("id");
    });
    if (this.examId) {
      this.getExamCostInfo(this.examId);
    }
  }

  addcCostInfo() {
    this.router.navigate([
      "admin/exam-costinfo/" +
        this.examId +
        "/cost/" +
        "new" +
        "/type/" +
        this.feeType
    ]);
  }

  getExamCostInfo(examid) {
    //console.log("in componenet", examid);
    this.examListService
      .getExamCostInfo(examid)
      .pipe(first())
      .subscribe(res => {
        this.examCostInfo = res;
       // console.log("chk result", res);
      });
  }

  onEdit(id) {
    this.router.navigate([
      "admin/exam-costinfo/" +
        this.examId +
        "/cost/" +
        id +
        "/type/" +
        this.feeType
    ]);
  }

  onDelete(id) {
    console.log("id", id);

    Swal.fire({
      title: "Are you sure?",
      text: "Eligibility Criteria will be deleted. This action cant be reversed!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deleted!", "Eligibility Criteria is deleted.", "success");
        this.examListService
        .deleteExamCostInfo(id)
        .pipe(first())
        .subscribe(res => {
          this.getExamCostInfo(this.examId);
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Eligibility Criteria is Not Deleted:)", "error");
      }
    });

   
  }
}
