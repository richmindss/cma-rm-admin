import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CoreService, AuthenticationService } from 'src/app/shared';
 
@Component({
  selector: 'app-header-logo',
  templateUrl: './app-header-logo.component.html',
  styleUrls: ['./app-header-logo.component.scss']
})
export class AppHeaderLogoComponent implements OnInit {

  dataAvailable = false;
  @Input() url:any ;//= "";
  logourl = null;
  @Input() docType:any ; //= //"header_logo";
  @Input() msg:any;
  @Input() header:any;
  @Input() dropZoneId:any;
  @Input() img_width;
  @Input() img_height;
  @Output() docImport = new EventEmitter<any>();
  @Output() docError = new EventEmitter<any>();
  @Output() docUploaded = new EventEmitter<any>();
  @Input() fileType:any; 
  @Input() uploadType: any;
  
  constructor(private coreService:CoreService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.url = this.coreService.getRootPath() + "/document/" + this.url;
     
    this.logourl = this.getImgUrl ();
    this.dataAvailable = true;
  }

  getRand  (){
    var d= new Date();
    return d.getHours () + "-" + d.getSeconds () + "--" + d.getMilliseconds ();
  }

  getImgUrl (){
    var t = this.getRand ();
   var url  = this.coreService.getRootPath() + "/document/type/" + this.docType;
    url += "?t=" + t;
    url += "&appname=" + this.coreService.getAppName ();
    url += "&usertype=" +  this.coreService.getUserType ();
    url += "&candidateid=" + this.authenticationService.getAuthToken ();
    return url;
  }


  ondocUploaded (e){
    this.docUploaded.emit(e);
    this.logourl = this.getImgUrl (); 
    
  }

  ondocImport(e){
    this.docImport.emit (e);
    
  }
  ondocError(e){
    console.log ("do you see it heer?", e);
    this.docError.emit(e);
  }
}
