import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 
@Component({
  selector: 'app-home-card-config-right',
  templateUrl: './home-card-config-right.component.html',
  styleUrls: ['./home-card-config-right.component.scss']
})
export class HomeCardConfigRightComponent implements OnInit {

  @Input() content:any;  
  @Output() onContentChanged = new EventEmitter<any> ();
  @Input() tinyId = "contentTinymce";




  constructor() { 
    
  }

  ngOnInit() {
  }

  onTextChange (e){
    this.onContentChanged.emit (e);
  }

}
