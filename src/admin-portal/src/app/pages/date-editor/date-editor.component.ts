import { Component, OnInit } from '@angular/core';
declare let tinymce: any;

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.scss']
})
export class DateEditorComponent implements OnInit {

  public selectionText: any = "";
  public newdoc: any;

  constructor() { }

  ngOnInit() {
  }

  onTextChange(text) {
    this.newdoc = text
  }
}
