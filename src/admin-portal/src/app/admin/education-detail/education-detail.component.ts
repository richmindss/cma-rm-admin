import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EducationDetailService } from "../../shared/services/education-detail/education-detail.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-education-detail",
  templateUrl: "./education-detail.component.html",
  styleUrls: ["./education-detail.component.scss"]
})
export class EducationDetailComponent implements OnInit {
  data: any;

  constructor(
    private educationdetailApi: EducationDetailService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEdu();
  }

  loadEdu() {
    this.educationdetailApi
      .getEducationDetail()
      .pipe(first())
      .subscribe(res => {
        this.data = res;
      });
  }

  open(edu) {
    this.router.navigate(["admin/education/" + edu._id]);
  }

  deleteData(edu) {
    this.educationdetailApi
      .deleteEducationDetail(edu._id)
      .pipe(first())
      .subscribe(r => {
        this.loadEdu();
      });
  }

  onEduDetail() {
    this.router.navigate(["admin/education/new"]);
  }
}
