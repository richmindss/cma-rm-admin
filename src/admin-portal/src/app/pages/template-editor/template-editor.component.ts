import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,Output,EventEmitter,
  ViewChild
}from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'tinymce';
import 'tinymce/themes/silver';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/image';

declare let tinymce: any;


@Component({
  selector: 'app-template-editor',
  //selector :'simple-tiny',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorContentChange = new EventEmitter();
  @Input() value: String;

  editor;
 
  ngAfterViewInit() {
   
  tinymce.init({
    // width : "740",
    height : "500",
    branding: false,
    selector: '#' + this.elementId,
    plugins: ['link', 'paste','table','image'],
    skin_url: 'assets/tinymce/skins/ui/oxide',
    setup: editor => {
      this.editor = editor;
      editor.on('keyup change', () => {
        const content = editor.getContent();
        this.onEditorContentChange.emit(content);
      });
    }
  });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
