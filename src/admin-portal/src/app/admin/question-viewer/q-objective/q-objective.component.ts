import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-q-objective',
  templateUrl: './q-objective.component.html',
  styleUrls: ['./q-objective.component.scss']
})
export class QObjectiveComponent implements OnInit, OnChanges {


  @Input() question: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges (){
    
  }

}
