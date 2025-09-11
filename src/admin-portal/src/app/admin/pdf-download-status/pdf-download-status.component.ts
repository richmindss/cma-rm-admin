import { Component, OnInit } from "@angular/core";
import { PdfStatusService } from "../../shared/services/pdf-status/pdf-status.service";
import { first } from "rxjs/operators";
import * as moment from 'moment';
@Component({
  selector: "app-pdf-download-status",
  templateUrl: "./pdf-download-status.component.html",
  styleUrls: ["./pdf-download-status.component.scss"]
})
export class PdfDownloadStatusComponent implements OnInit {
  candstatus: any = [];

  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  statusCount = 0;
  filter:any = {
    key: ''
  };

  constructor(private pdfstatusApi: PdfStatusService) {}

  ngOnInit() {
    this.getPdfStatus();
  }

  getPdfStatus() {
    this.pdfstatusApi
      .getPdfStatus(this.filter, this.currentPage, this.pageSize)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.candstatus = res["data"];
          this.statusCount = res["count"];
        }
      });
  }

  fetchStatusData(e) {
    this.currentPage = e;
    this.getPdfStatus();
  }

  getDate (x){
   // console.log ("when ..", x);
   return  moment (x.updated).format ("DD/MM/YYYY hh:mm a");
  }
}
