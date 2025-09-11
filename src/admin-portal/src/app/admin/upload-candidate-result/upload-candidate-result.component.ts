import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { UploadScoreService } from "../../shared/services/uploadCondidateScore/upload-score.service";

@Component({
  selector: 'app-upload-candidate-result',
  templateUrl: './upload-candidate-result.component.html',
  styleUrls: ['./upload-candidate-result.component.sass']
})
export class UploadCandidateResultComponent implements OnInit {

  fileType: any =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  uploadType: any = "scoreUpload";
  error:any;
  condidatescheduledata: any;
  dataAvailable = false;
  dataCount: any;
  errorCount = 0;
  errorMessage = null;
  successMessage = null;
  private _success = new Subject<string>();
  private _error = new Subject<string>();

  constructor( private UploadScoreService: UploadScoreService,) { }

  ngOnInit(): void {
    this.initAlert();
  }

  ondocImport(e) {
    this.condidatescheduledata = e;
    if (this.condidatescheduledata.length > 0) {
      this.dataAvailable = true;
      this.dataCount = this.condidatescheduledata.length;
      this.errorCount = 0;
      for (var i = 0; i<this.condidatescheduledata.length; i++){
        this.errorCount += this.condidatescheduledata[i].error? 1: 0;
      }
    } else {
      this.dataAvailable = false;
      this._error.next("Data not found!!");
    }

  }

  onConfirm() {
    let obj = {
      records:this.condidatescheduledata
    }
      this.UploadScoreService
        .saveCandidateScore(obj)
        .pipe(first())
        .subscribe(res => {
          this.dataAvailable = false;
          this._success.next("Data Imported Successfully!!");
        });
  }

  initAlert() {
    this._success.subscribe(message => (this.successMessage = message));
    this._success
      .pipe(debounceTime(2000))
      .subscribe(() => (this.successMessage = null));

    this._error.subscribe(message => (this.errorMessage = message));
    this._error
      .pipe(debounceTime(2000))
      .subscribe(() => (this.errorMessage = null));
  }

  ondocError(e) {
    this.error = e;
  }
}
