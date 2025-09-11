import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-doc-template',
  templateUrl: './template-doc-template.component.html',
  styleUrls: ['./template-doc-template.component.sass']
})
export class TemplateDocTemplateComponent implements OnInit {

  err:any = "";
  documentId:any = "";
  wordType = "officedocument";
  constructor() { }

  ngOnInit(): void {
  }


  ondocUploaded  (e){
    this.documentId = e.documentid;
    this.err = ""; 
  }

  onError (e){
    console.log ("and werr ..", e);
    this.err = e;
  }
  
}
