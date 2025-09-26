import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-q-match-pair',
  templateUrl: './q-match-pair.component.html',
  styleUrls: ['./q-match-pair.component.scss']
})
export class QMatchPairComponent implements OnInit, OnChanges {


  @Input() question: any;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges (){
    
  }

}
