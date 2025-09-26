import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-q-subjective',
  templateUrl: './q-subjective.component.html',
  styleUrls: ['./q-subjective.component.scss']
})
export class QSubjectiveComponent implements OnInit, OnChanges {


  @Input() question: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges (){
    
  }

}
