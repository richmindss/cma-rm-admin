import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-q-sub-answer',
  templateUrl: './q-sub-answer.component.html',
  styleUrls: ['./q-sub-answer.component.scss']
})
export class QSubAnswerComponent implements OnInit {
  
  selectionText:any;
  
  @Input() question: any;
  
  constructor() { }

  ngOnInit() {
  }

  onTextChange (e){

  }

}
