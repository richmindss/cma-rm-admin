import { Component, OnInit, Input } from '@angular/core';
import { CoreService, AuthenticationService } from "../../shared/services/";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:any={};
  @Input() language:any;
  
  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit() {
     this.user = this.authenticationService.getUserDetails();
  }

}
