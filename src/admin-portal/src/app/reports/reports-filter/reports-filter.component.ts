import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegistrationReportService } from "../../shared/services/registration-report/registration-report.service";
import { first } from "rxjs/operators";
import * as moment from "moment";
import { CoreService } from 'src/app/shared';


@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.scss']
})
export class ReportsFilterComponent implements OnInit {

  @Input() reportFilter: any;
  exam: any;

  @Output() reportFilterChange = new EventEmitter();


  constructor(private registrationReportService: RegistrationReportService,
   private coreService :CoreService) { }

  ngOnInit() {
    this.getExam();
  }

  onModelChange(e) {
    this.reportFilterChange.emit(this.reportFilter);
  }

  getExam() {
    this.registrationReportService
      .getExam()
      .pipe(first())
      .subscribe(res => {
        this.exam = res;
      });

  }

  compareFn(a, b) {
    return this.coreService.compareFn(a, b);
  }

 
}
