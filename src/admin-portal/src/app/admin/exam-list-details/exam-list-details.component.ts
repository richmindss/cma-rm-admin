import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExamListService } from "../../shared/services/exam-list/exam-list.service";
import { ExamidGenrationService } from "../../shared/services/examid-genration/examid-genration.service";
import { first } from "rxjs/operators";
import * as moment from "moment";
import { AlertService, CoreService } from 'src/app/shared';

@Component({
  selector: "app-exam-list-details",
  templateUrl: "./exam-list-details.component.html",
  styleUrls: ["./exam-list-details.component.scss"]
})
export class ExamListDetailsComponent implements OnInit {
  meridian = true;
  error: any;
  examid: any;
  sender = "exam-list";
  currentOrientation = "horizontal";
  examGenType: any;
  time_zone =    new Date().getTimezoneOffset();


  examDetails: any = {
    _id: "",
    exam_name: "",
    exam_desc: "",
    app_startdate: "",
    app_starttime: { hour: 0, minute: 0 },

    app_enddate: "",
    app_endtime: { hour: 23, minute: 59 },

    payment_startdate: "",
    payment_starttime: { hour: 0, minute: 0 },

    payment_enddate: "",
    payment_endtime: { hour: 23, minute: 59 },

    fee_type: "categorywise",
    examwise_fee: ""
  };

  //alerts
  errorMessage = null;
  successMessage = null;
  today: any;
  app_startdate: any;
  app_enddate: any;
  payment_startdate: any;
  payment_enddate: any;

  constructor(
    private core: CoreService,
    private examListServiceApi: ExamListService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private examGenrationApi: ExamidGenrationService
  ) { }

  ngOnInit() {
    this.initDateRange();
    this.getExamMethod();
    this.route.paramMap.subscribe(params => {
      this.examid = params.get("id");

      if (this.examid !== "new") {
        this.getExambyId(this.examid);
      }
    });
  }
  getExamMethod() {
    this.examGenrationApi
      .getExamgenration()
      .pipe(first())
      .subscribe(res => {
        if (res && res[0]) {
          this.examGenType = res[0].type;
        }
      });
  }


  getStartTime (date, time, zone){

    let currOffset =  new Date().getTimezoneOffset();

    var t = moment.utc ( date, this.core.dateFormat())
            .add (time.hour, 'hour')
            .add (time.minute, 'minute')
            .add (zone, 'minute')
            .add (-currOffset, 'minute') 
            return t;
            
  }

  initDateRange() {
    this.today = moment().toDate();
  }

  onAppStartDateChanged() {
    //console.log("date is => ", this.examDetails.app_startdate);
  }

  onAppStartTimeChanged(x) {
    //console.log("time ==> ", this.examDetails.app_starttime, x);
  }
  onAppEndDateChanged() {
    //console.log("date is => ", this.examDetails.app_enddate);
  }

  onAppEndTimeChanged(x) {
    //console.log("time ==> ", this.examDetails.app_endtime, x);
  }
  onPaymentStartDateChanged() {
    //console.log("date is => ", this.examDetails.payment_startdate);
  }
  onPaymentEndDateChanged() {
    //console.log("date is => ", this.examDetails.payment_enddate);
  }
  onPaymentStartTimeChanged(x) {
    //console.log("time ==> ", this.examDetails.payment_starttime, x);
  }

  onPaymentEndTimeChanged(x) {
    //console.log("time ==> ", this.examDetails.payment_endtime, x);
  }

  makeDate(d) {
    return this.core.toDate(d);
  }

  getExambyId(id) {
    this.examListServiceApi
      .getExambyId(id)
      .pipe(first())
      .subscribe(res => {
        this.examDetails = res;


        /** start date  */
  
       // var parsedStart =  this.getStartTime (this.examDetails.app_startdate, this.examDetails.app_starttime, this.examDetails.time_zone);
        //this.examDetails.app_startdate = parsedStart.toDate ();
        //this.examDetails.app_starttime = {hour: +parsedStart.format("HH"), minute: +parsedStart.format("mm")};

        /** parsed end date  */
        //var parsedEndDate =  this.getStartTime (this.examDetails.app_enddate, this.examDetails.app_endtime, this.examDetails.time_zone);
        //this.examDetails.app_enddate = parsedEndDate.toDate ();
        //this.examDetails.app_endtime = {hour: +parsedEndDate.format("HH"), minute: +parsedEndDate.format("mm")};
        
        /** parsed payment start */
       // var parsedPaymentStart =  this.getStartTime (this.examDetails.payment_startdate, this.examDetails.payment_starttime, this.examDetails.time_zone);
        //this.examDetails.payment_startdate = parsedPaymentStart.toDate ();
        //this.examDetails.payment_starttime = {hour: +parsedPaymentStart.format("HH"), minute: +parsedPaymentStart.format("mm")};

        /**** parsed paymetn end  */
       // var parsedPaymentEnd =  this.getStartTime (this.examDetails.payment_enddate, this.examDetails.payment_endtime, this.examDetails.time_zone);
        //this.examDetails.payment_enddate = parsedPaymentEnd.toDate ();
        //this.examDetails.payment_endtime = {hour: +parsedPaymentEnd.format("HH"), minute: +parsedPaymentEnd.format("mm")};


        this.examDetails.app_startdate = this.makeDate(this.examDetails.app_startdate);
        this.examDetails.app_enddate = this.makeDate(this.examDetails.app_enddate);
        this.examDetails.payment_startdate = this.makeDate(this.examDetails.payment_startdate);
        this.examDetails.payment_enddate = this.makeDate(this.examDetails.payment_enddate);
      });
  }






  validateFloatKeyPress(el, evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    var number = el.split(".");
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    //just one dot
    if (number.length > 1 && charCode == 46) {
      return false;
    }
    //get the current position
    var caratPos = el.lastIndexOf(document.getSelection());
    var dotPos = el.indexOf(".");
    if (caratPos > dotPos && dotPos > -1 && number[1].length > 1) {
      return false;
    }
    return true;
  }

  isNumber(evt) {
    return this.core.isNumber(evt);
  }


  public notCopyPasteSpecialCharAndAlphabet(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-z0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-z0-9]/g, "");
      // invalid character, prevent input

    }
  }

  isNumberhyphen(evt) {
    return this.core.isNumberhyphen(evt);
  }

  onSubmit() {
    this.error = null;

    if (!this.examDetails.exam_name) {

      this.alertService.err(this.sender, "Please enter the Examination Name");
      return;
    }
    if (!this.examDetails.exam_desc) {

      this.alertService.err(this.sender, "Please enter the Examination Description");
      return;

    }

    if (!this.examDetails.app_startdate || !this.examDetails.app_starttime) {

      this.alertService.err(this.sender, "Please enter the Application Start Date & Time");
      return;
    }
    if (!this.examDetails.app_enddate || !this.examDetails.app_endtime) {

      this.alertService.err(this.sender, "Please enter the Application End Date & Time");
      return;
    }

    if (
      !this.examDetails.payment_startdate ||
      !this.examDetails.payment_starttime
    ) {

      this.alertService.err(this.sender, "Please enter the Payment Start Date & Time");
      return;
    }
    if (
      !this.examDetails.payment_enddate ||
      !this.examDetails.payment_endtime
    ) {

      this.alertService.err(this.sender, "Please enter the Payment End Date");
      return;
    }
    if (!this.examDetails.fee_type) {

      this.alertService.err(this.sender, "Please select the Fee Type");
      return;
    }
    if (
      this.examDetails.fee_type == "examwise" &&
      !this.examDetails.examwise_fee
    ) {

      this.alertService.err(this.sender, "Please enter correct Fee Amount for Exam");
      return;
    }
    if (this.examDetails.app_enddate < this.examDetails.app_startdate) {

      this.alertService.err(this.sender, "End date of Application Period should greater than start date.");
      return;
    }
    if (this.examDetails.payment_startdate > this.examDetails.payment_enddate) {
      this.alertService.err(this.sender, "End date of Payment Period should greater than start date.");
      return;
    }


    let data = Object.assign({}, this.examDetails);

    data.app_startdate = this.core.fromDate(this.examDetails.app_startdate);
    data.app_enddate = this.core.fromDate(this.examDetails.app_enddate);
    data.payment_startdate = this.core.fromDate(this.examDetails.payment_startdate);
    data.payment_enddate = this.core.fromDate(this.examDetails.payment_enddate);
    data.time_zone = this.time_zone;


    this.examListServiceApi
      .saveExam(data)
      .pipe(first())
      .subscribe(res => {
       
        if(res["status"]=="error"){
         return alert(res["message"]);
        }
        if (this.examid == "new") {
          this.alertService.show(this.sender, "Exam List Data saved successfully..");
          setTimeout(() => {
            this.router.navigate(["admin/exam-list"]);
          }, 1000);
          return;
        }
        //window.scrollTo(0, 0);

      });
  }

  onCancel() {
    this.router.navigate(["admin/exam-list"]);
  }
}
