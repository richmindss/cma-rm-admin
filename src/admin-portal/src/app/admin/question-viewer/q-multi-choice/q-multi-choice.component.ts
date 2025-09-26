import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-q-multi-choice',
  templateUrl: './q-multi-choice.component.html',
  styleUrls: ['./q-multi-choice.component.scss']
})
export class QMultiChoiceComponent implements OnInit, OnChanges {

  @Input() question: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges (){
    
  }

}
