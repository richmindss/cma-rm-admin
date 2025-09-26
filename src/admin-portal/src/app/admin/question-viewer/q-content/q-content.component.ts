import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-q-content',
  templateUrl: './q-content.component.html',
  styleUrls: ['./q-content.component.scss']
})
export class QContentComponent implements OnInit, OnChanges {
  combinedHtmlContent: string;
  @Input() question: any;
  contents: any = [];

  constructor() { }

  ngOnInit() {
    this.combinedHtmlContent = `${this.question.question}`;
  }

  ngOnChanges (){
    if (this.question){
      this.contents = [];
      this.replaceImage ();
    }
  }

  replaceImage (){
      if (!this.question.uploadinfo){
        this.contents.push (this.question.question);
        return 
      } 
    }

     


  

  getImageViewer(fileid){
    var url = this.getImageUrl (fileid);
   // var html  = "<app-q-image [fileid]=""
  }

  getImageUrl (docid){
    return "";
  }

  getDocId (imgname){

    for (var i=0; i<this.question.uploadinfo.length; i++){
      if (this.question.uploadinfo[i].image == imgname){
        return this.question.uploadinfo[i].fileid;
      }
    }
    return "";
     
  }

  getError (imgname){

    for (var i=0; i<this.question.uploadinfo.length; i++){
      if (this.question.uploadinfo[i].image == imgname){
        return this.question.uploadinfo[i].error;
      }
    }
    return "";
     
  }

}
