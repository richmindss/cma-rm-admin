import { Component, OnInit } from '@angular/core';
declare let tinymce: any;

@Component({
  selector: 'app-logo-name-config',
  templateUrl: './logo-name-config.component.html',
  styleUrls: ['./logo-name-config.component.scss']
})
export class LogoNameConfigComponent implements OnInit {

  public selectionText: any = "Enter some text";
  public newdoc: any;

  constructor() { }

  ngOnInit() {
  }
  onTextChange(text) {
    this.newdoc = text
  }

}
