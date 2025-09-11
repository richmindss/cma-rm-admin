import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, ApplicationConfiguartionService, CondidateViewService } from 'src/app/shared';
import { ConstantService } from 'src/app/shared/services/constant/constant.service';
import { ExamListService } from 'src/app/shared/services/exam-list/exam-list.service';
import * as moment from 'moment';
import Swal from "sweetalert2";

@Component({
  selector: 'app-pay-veri-detail',
  templateUrl: './pay-veri-detail.component.html',
  styleUrls: ['./pay-veri-detail.component.sass']
})
export class PayVeriDetailComponent implements OnInit {

  examid:any;
  userid: any;

  userStatus:any;
  currentStatus:any;
  profileResult:any;
  exam:any;
  orderInfo:any;
  reject_reason:any;
  approval_notes:any;
  application:any;
  exception_reason:any;
  exception_txid:any;
  exception_method:any;
  exception_txdate:any;

  transactions =[];
  
  constructor(private activateRoute: ActivatedRoute, 
    private router: Router,
    private examApi: ExamListService,
    private alert:AlertService, 

    private appVeriService: ApplicationConfiguartionService,
    private candidateViewService: CondidateViewService) {

    

   }

  ngOnInit(): void {

    this.activateRoute.params.subscribe (p => {
      this.examid = p.examid;
      this.userid = p.userid;
      

      this.getUserStatus ();
      this.personalDetails ();
      this.getExam ();
      this.getOrderInfo ();
      this.getApplication ();
    }); 
  }


  getApplication (){
    this.candidateViewService.getApplication ({userid: this.userid, examid: this.examid})
    .pipe (first())
    .subscribe (res=>{
      this.application = res;
    });
  }
  getOrderInfo (){
    this.appVeriService.getOrderInfo (this.examid, this.userid)
    .pipe (first())
    .subscribe (res=>{
      this.orderInfo = res;

      this.transactions = [];
      if (this.orderInfo && this.orderInfo.request && this.orderInfo.request.pg_response && this.orderInfo.request.pg_response.acquirer_data){
        for (var x in this.orderInfo.request.pg_response.acquirer_data){
          this.transactions.push ({name: x, value: this.orderInfo.request.pg_response.acquirer_data[x]})
        }
      }
    });
  }

  getExam (){

    this.examApi.getExambyId (this.examid)
    .pipe (first())
    .subscribe (res=>{
      this.exam = res;
    });

  }

  getUserStatus() {
    this.candidateViewService.getUserStatus(this.userid, this.examid)
      .pipe(first())
      .subscribe(res => {
        this.userStatus = res;
        this.currentStatus = this.userStatus.statuscode;
      });
  }

  personalDetails() {
    this.candidateViewService.getPersonalDetailsByUserid(this.userid)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.profileResult = res;
        }
      });
  }

  getDate (t){
    return  moment(t).format("DD/MM/YYYY hh:mm A");
  }

  reject (){

    if (!this.reject_reason){
      return this.alert.e ("Reject reason is required");
    }

    

    
    Swal.fire({
      title: "Are you sure?",
      text: "Payment will be rejected",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
         
          this.doReject ();
      }  
    });
  }
  approve (){

   

    Swal.fire({
      title: "Are you sure?",
      text: "Payment will be approved",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
         
          this.doApprove ();
      }  
    });
  }


  doReject (){
    var data = {
      message: this.reject_reason,
      examid: this.examid,
      userid: this.userid
    };
    this.candidateViewService.rejectPayment (data)
    .pipe (first())
    .subscribe ( (res:any)=>{
      if (res.status == "error"){
        return this.alert.e (res.message);
      }

      this.alert.s ("Payment rejected");
      this.getUserStatus ();

    });
  }


  doApprove (){
    var data = {
      message: this.approval_notes,
      examid: this.examid,
      userid: this.userid
    };

    this.candidateViewService.approvePayment (data)
    .pipe (first())
    .subscribe ( (res:any)=>{
      if (res.status == "error"){
        return this.alert.e (res.message);
      }

      this.alert.s ("Payment approved");
      this.getUserStatus ();

    });


  }

  closeThis (){
    this.router.navigate (["admin/payments"]);
  }

  addExceptionAccept (orderInfo){
    if (!this.exception_reason){
      return this.alert.e ("Please enter reason for exception");
    }
    if (!this.exception_txid){
      return this.alert.e ("Please enter Tx ID");
    }
    if (!this.exception_method){
      return this.alert.e ("Please enter Tx Method");
    }
    if (!this.exception_txdate){
      return this.alert.e ("Please enter Tx Date in correct format");
    }

   

    Swal.fire({
      title: "Are you sure?",
      text: "You are trying to approve this payment. This action cant be reversed. you will need to do reject payment and ask the candidate to go throigh the process again",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do  it!",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
         
        var data = {
          id: orderInfo._id,
          reason: this.exception_reason,
          trxid: this.exception_txid,
          method: this.exception_method,
          txdate: this.exception_txdate
        };

        // {id: id, reason: reason}
           
        this.candidateViewService.acceptPayment (data)
        .pipe (first())
        .subscribe ( (res:any)=>{
          if (res.status == "error"){
            return this.alert.e (res.message);
          }
    
          this.alert.s ("Payment accepted");
          this.getOrderInfo ();
    
        });

      }  
    });
  }



}
