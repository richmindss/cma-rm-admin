import { Component, OnInit, Input,Pipe } from '@angular/core';
import { UserListService ,AuthenticationService} from "../../shared/services/";
import { first } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: 'app-candidate-activity',
  templateUrl: './candidate-activity.component.html',
  styleUrls: ['./candidate-activity.component.scss']
})
export class CandidateActivityComponent implements OnInit {

  pageSize = 10;
  currentPage = 1;
  eventCount = 0;
 
  activities: any = [];

   


  constructor(private candidteActivityApi: UserListService) { }

  ngOnInit() {
   this.getActivities ();
  }

  formateDate(date:any){
   return moment(date).format("DD MMM YYYY, hh:mm:ss A");
  }

  getActivities (){

    this.candidteActivityApi.getActivities (this.currentPage)
    .pipe (first())
    .subscribe ( (res:any) =>{
      console.log("res...............",res.count,res.data);
      this.eventCount = res.count;
      this.activities = res.data;
    });
  }


  fetchUserData (e){
    this.currentPage = e;
    this.getActivities ();
  }

   
}