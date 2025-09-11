import { Component, OnInit } from "@angular/core";
import { CandidateListService } from "../../shared/services/candidate-list/candidate-list.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-candidate-list",
  templateUrl: "./candidate-list.component.html",
  styleUrls: ["./candidate-list.component.scss"]
})
export class CandidateListComponent implements OnInit {
  events: any = [];

  filter: any = {
    key: ""
  };
  data: any;
  pageSize = 25;
  currentPage = 1;
  candidateCount = 0;

  constructor(
    private candidateListApi: CandidateListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchcandidateList();
  }

  searchcandidateList() {
    this.candidateListApi
      .getCandidateList(this.currentPage, this.pageSize, this.filter)
      .pipe(first())
      .subscribe(res => {
        this.data = res["data"];
        this.candidateCount = res["count"];
      });
  }

  fetchCandidateData(e) {
    this.currentPage = e;
    this.searchcandidateList();
  }

  clearCandidateList() {
    this.filter = "";
    this.searchcandidateList();
  }

  onEdit(s) {
    this.router.navigate(["admin/candidate-details/" + s._id]);
  }
}
