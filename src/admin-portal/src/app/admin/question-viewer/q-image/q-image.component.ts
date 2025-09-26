import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthenticationService, CoreService } from 'src/app/shared';
 
@Component({
  selector: 'app-q-image',
  templateUrl: './q-image.component.html',
  styleUrls: ['./q-image.component.scss']
})
export class QImageComponent implements OnInit, OnChanges {

  @Input () fileid: any;
  imgUrl:any;
  constructor(private authenticationService: AuthenticationService,
    private coreservice: CoreService) { }

  ngOnInit() {
  }

  ngOnChanges (){
    if (this.fileid){
      this.imgUrl  =  this.loadImage ();
    }
  }


  loadImage (){
    
return "https://rrcwr-rm-bucket.s3.ap-south-1.amazonaws.com/question%3A1758627750987%3AQ1.png";
    var token  = this.authenticationService.getAuthToken ();
    var url = this.coreservice.getRootPath()  +"/documents/fileid/" + this.fileid;
    url += "?token=" + token;
    url += "&appname=" + this.coreservice.getAppName ();
    url += "&usertype=" + this.coreservice.getUserType ();

    return url;
  }



}
