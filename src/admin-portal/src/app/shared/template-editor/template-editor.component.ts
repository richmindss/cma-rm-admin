import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,Output,EventEmitter,
  ViewChild,
  OnInit
}from '@angular/core';
 
import 'tinymce';
import 'tinymce/themes/silver';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/image'; 
import 'tinymce/plugins/code'; 


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
      plugins: ['link', 'paste','table','image','code'],
       setup: (editor: any) => {
      // Block invalid keystrokes
      editor.on('keypress', (e: KeyboardEvent) => {
        const char = String.fromCharCode(e.which || e.keyCode);
        if (!/^[a-zA-Z0-9 ]$/.test(char)) {
          e.preventDefault();
        }
      });

      // Clean pasted or injected content
    }
    };
  

  }

  onValueChanges (e){
    
    this.onEditorContentChange.emit (e);
  }
 
  

  ngOnDestroy() {
    
  }

}
