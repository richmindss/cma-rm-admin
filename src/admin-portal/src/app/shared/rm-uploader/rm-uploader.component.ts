import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as Dropzone from 'dropzone'; 
import { AuthenticationService, CoreService } from '../services';



@Component({
  selector: 'app-rm-uploader',
  templateUrl: './rm-uploader.component.html',
  styleUrls: ['./rm-uploader.component.scss']
})
export class RmUploaderComponent implements OnInit, AfterViewInit {
  

  @Input() url:any;
  @Input() msg: any;
  @Input() doctype:any;

  @Input() contextId:any;
  @Input() contextType:any;
  @Input() dropZoneId: any;
  @Input() fileType:any;
  @Input() uploadType:any;
  @Input() img_width;
  @Input() img_height;
  public dropZone: any;
  Height:any;
  Width:any;
 // public dropzoneId: any  = "mydropzone";



  @Output() docUploaded = new EventEmitter<any>();
  @Output() docimport = new EventEmitter<any>();
  @Output() docError = new EventEmitter<any>();


  constructor(private authenticationService: AuthenticationService,
    private coreService:CoreService) { }

  ngOnInit() {    
    
  }


  ngAfterViewInit(): void { 
    this.dropZoneInit ();
    
  }


  dropZoneInit() {

  var token  = this.authenticationService.getAuthToken ();
  //console.log ("dropZoneId =? " +  this.dropZoneId + " and  url =>" + this.url, this.msg);

  var ele  = document.getElementById (this.dropZoneId);
//console.log  ("ehre is element s ==>", ele);
  if (!ele){
    return;
  }
  if (this.dropZone){
    return;
  }
 
  //Dropzone.autoDiscover = false;
  this.dropZone = new Dropzone("div#"+ this.dropZoneId, { 
    url: this.url,
    uploadMultiple: false,
    dictDefaultMessage: this.msg,
    maxFiles: 5, 
    headers: {
      contextid: this.contextId,
      contexttype: this.contextType,
      doctype:  this.doctype,
      token: token, 
      appname:this.coreService.getAppName (),
      usertype: this.coreService.getUserType ()

      
    },
    accept:  (file, done) => {      

      console.log ("herer is file ..", file);
      //type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      if (this.uploadType == 'hall_ticket' || this.uploadType == 'upload_application_template' ){
        if (file.type.indexOf (this.fileType) >=0){
          return done ();
        }else {
          var isWord = file.name.indexOf (".docx")>=0 ||file.name.indexOf (".doc")>=0 ;
          if (isWord){
            return done ();
          }
          this.docError.emit("It should be a word file - .doc or .docx");  
          return done ("It should be a word file - .doc or .docx");
        }
       
       }
     
      if(this.fileType.indexOf(file.type) >= 0){   

      

        if(this.uploadType ==="import"){ 
          done ();
        } else if (this.uploadType ==="imagelogo" || this.uploadType ==="imagebanner" || this.uploadType ==="photoimg"){
          // this.docError.emit(" ");            
          if(this.uploadType ==="imagelogo" ){
            return done ();//
          this.dropZone.on("thumbnail", (file)=>{
            //this.Height=file.height;
            //this.Width=file.width;    
            if (file.width === 200 && file.height === 100){
              done ();
            }else{
              this.docError.emit("Please upload image with width equal to  200 px and height equal to 100 px");
              done ("Please upload image with width equal to  200 px and height equal to 100 px");              
            }    
        });
      }else if(this.uploadType ==="imagebanner"){
       
        this.dropZone.on("thumbnail", (file)=>{
          //this.Height=file.height;
          //this.Width=file.width;    
          if (file.width === 800 && file.height === 100){
            done ();
          }else{
            //this.docError.emit("Please upload image with width equal to 800 px and height equal to 100 px");
            done ("Please upload image with width equal to 800 px and height equal to 100 px");              
          }    
      });
      }  
      else if(this.uploadType ==="photoimg"){
        this.dropZone.on("thumbnail", (file)=>{
         // return done (); //disable
          //this.Height=file.height;
          //this.Width=file.width;    
          if (file.width === 200 && file.height === 100){
            // this.docError.emit(" ");             
            done ();
          }else{
             this.docError.emit("Please upload image with width equal to 200 px and height equal to 100 px");
            done ("Please upload image with width equal to 200 px and height equal to 100 px");              
          }    
      });
      }          
       
      }else if(this.uploadType ==="scoreUpload"){
        done();
      } 

      }
      else{        
        if(this.uploadType ==="import"){
        this.docError.emit("Please upload valid excel file, allowed only Xlxs file type.");            
        done ("Please upload valid excel file, allowed only Xlxs file type");
        }else if(this.uploadType ==="scoreUpload"){
          this.docError.emit("Please upload valid excel file, allowed only Xlxs file type.");            
          done ("Please upload valid excel file, allowed only Xlxs file type");
        }
        else{
          this.docError.emit("Please upload valid image file, allowed only image file type( Jpg,Jpeg,Png)");            
          done ("Please upload valid image file, allowed only image file type( Jpg,Jpeg,Png)");
        }
      } 
      
    }
  });


   
  this.dropZone.on("success", (file, response) => {    
    if(file.type =="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      this.docimport.emit (response);
    }else if (response.documentid){      
      this.docUploaded.emit (response);
    }else {
      alert  ("file upload failed..." + response.status);
    }
  }); 


  this.dropZone.on("complete", (file) => { 
    this.dropZone.removeFile (file);
  }); 

}
}
