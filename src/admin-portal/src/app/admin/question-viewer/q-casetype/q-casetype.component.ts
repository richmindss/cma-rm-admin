import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-q-casetype',
  templateUrl: './q-casetype.component.html',
  styleUrls: ['./q-casetype.component.scss']
})
export class QCasetypeComponent implements OnInit, OnChanges {


  @Input() question: any;

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges (){
    
  }
}
