import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,Output,EventEmitter,
  ViewChild,
  OnInit
}from '@angular/core';
 
import 'tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/image'; 
import 'tinymce/plugins/code';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/charmap';


@Component({
  selector: 'app-template-editor',
  //selector :'simple-tiny',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit, OnDestroy {

  @Input() elementId: string;
  @Output() onEditorContentChange = new EventEmitter();
  @Input() value: string;
  @Input() height:any;

  constructor( ) { }

   
  props:any;
 

  ngOnInit (){
    this.props = {
      height: this.height,
      branding:false,
      plugins: ['link', 'paste','table','image','code','insertdatetime','charmap'],
      skin: 'oxide',
      content_css: 'default',
      base_url: 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6' // TinyMCE CDN
    };
  

  }

  onValueChanges (e){
    
    this.onEditorContentChange.emit (e);
  }
 
  

  ngOnDestroy() {
    
  }

}
