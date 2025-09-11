import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-candidate",
  templateUrl: "./candidate.component.html",
  styleUrls: ["./candidate.component.scss"]
})
export class CandidateComponent implements OnInit {
  
  candidate: any = {
   
  };

  constructor(
  ) {}

  ngOnInit() {
    this.candidate.fromdate = moment().toDate();
    this.candidate.todate = moment().toDate();
  }

  

}
