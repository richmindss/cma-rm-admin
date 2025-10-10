import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserListService ,AuthenticationService} from "../../shared/services/";
import { debounceTime, first } from "rxjs/operators";
import { AlertService } from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-topic-master',
  templateUrl: './topic-master.component.html',
  styleUrls: ['./topic-master.component.scss']
})
export class TopicMasterComponent implements OnInit {
  event: any;
  error: any;
  sender = "jobs";
  public topicObj:any =  { id:'' ,Code : '',  Name:'', Status: false,Type:"topicMaster"};
  bsValue = new Date();
  topicArr:any =[];

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

     if (!this.topicObj.Code) {
       this.error = "Enter Topic Code";
       return;
     }
 
     if (!this.topicObj.Name) {
       this.error = "Enter Topic Name";
       return;
     }

     this.userListService
      .saveTopic(this.topicObj)
      .pipe(first())
      .subscribe(res => {
        console.log(res)
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
         alert("Topic Saved Successfully ...")
         this.alertService.show(this.sender, "Topic Saved Successfully ...");
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
      .getTopicList("topicMaster")
      .pipe(first())
      .subscribe(res => {
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
          this.topicArr = res["data"];
          //console.log("this.examArr......",this.examArr);
        }
       
      });
  }
 
 updateTopic(){
     this.error = "";
      if (!this.topicObj.Code) {
       this.error = "Enter Topic Code";
       return;
     }
 
     if (!this.topicObj.Name) {
       this.error = "Enter Topic Name";
       return;
     }
   
    this.userListService
      .updateTopic(this.topicObj)
      .pipe(first())
      .subscribe(res => {
        console.log(res)
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
         alert("Topic Updated Successfully ...")
         this.alertService.show(this.sender, "Topic Updated Successfully ...");
         this.modalService.dismissAll();
         this.getTopicList();
        }
       
      });
  }
 
   open(content:any, eventdetails:any) {
     this.error = "";
     this.event = eventdetails;
     this.topicObj = { Code : '',  Name:'', Status: false,Type:"topicMaster"};;
     this.modalService
       .open(content, {size: "lg",ariaLabelledBy: "modal-basic-title" })
       .result.then(result => { });
   }
 
   openForUpdate(content:any, eventdetails:any) {
 
     this.error = "";
     this.event = eventdetails;
     const modalRef = this.modalService.open(content,{size: "lg"});
     this.topicObj = {id:this.event._id, Code : this.event.Code,  Name:this.event.Name, Status: this.event.Status,Type:"topicMaster"};;
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
