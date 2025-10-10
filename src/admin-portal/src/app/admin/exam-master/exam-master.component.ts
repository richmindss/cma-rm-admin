import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserListService ,AuthenticationService} from "../../shared/services/";
import { debounceTime, first } from "rxjs/operators";
import { AlertService } from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-exam-master',
  templateUrl: './exam-master.component.html',
  styleUrls: ['./exam-master.component.scss']
})
export class ExamMasterComponent implements OnInit {

   event: any;
  error: any;
  sender = "jobs";
  public examObj:any =  { id:'', Name:'', Status: false,Type:"examMaster"};
  bsValue = new Date();
  examArr:any =[];

  constructor(
    private modalService: NgbModal,
    private userListService: UserListService,
    private alertService: AlertService,
            ) { }

    ngOnInit(): void {
      this.getTopicList();
    }

   async createTopic (){

    try{

     if (!this.examObj.Name) {
       this.error = "Enter Exam Name";
       return;
     }

     this.userListService
      .saveTopic(this.examObj)
      .pipe(first())
      .subscribe(res => {
        console.log(res)
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
         alert("Exam Saved Successfully ...")
         this.alertService.show(this.sender, "Exam Saved Successfully ...");
         this.modalService.dismissAll();
         this.getTopicList();
        }
       
      });
     }catch(e){
      this.alertService.err(this.sender, e["message"]);
    }
  }

  getTopicList(){
    this.userListService
      .getTopicList("examMaster")
      .pipe(first())
      .subscribe(res => {
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
          this.examArr = res["data"];
        }
       
      });
  }
 
 updateTopic(){
     this.error = "";

     if (!this.examObj.Name) {
       this.error = "Enter Exam Name";
       return;
     }
   
    this.userListService
      .updateTopic(this.examObj)
      .pipe(first())
      .subscribe(res => {
        console.log(res)
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
         alert("Exam Updated Successfully ...")
         this.alertService.show(this.sender, "Exam Updated Successfully ...");
         this.modalService.dismissAll();
         this.getTopicList();
        }
       
      });
  }
 
   open(content:any, eventdetails:any) {
     this.error = "";
     this.event = eventdetails;
     this.examObj = { Code : '',  Name:'', Status: false,Type:"examMaster"};;
     this.modalService
       .open(content, {size: "lg",ariaLabelledBy: "modal-basic-title" })
       .result.then(result => { });
   }
 
   openForUpdate(content:any, eventdetails:any) {
 
     this.error = "";
     this.event = eventdetails;
     const modalRef = this.modalService.open(content,{size: "lg"});
     this.examObj = {id:this.event._id,Name:this.event.Name, Status: this.event.Status,Type:"examMaster"};;
     modalRef.result.then((result) => {
       if (result) {console.log(result);}
     }).catch((err) => {
  // prevent "Cross click" error when user clicks ✖️
      if (err === 'Cross click' || err === 'backdrop click') {
        console.log('Modal closed by user.');
      } else {
        console.error(err);
      }
    });
   }


}
