import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-q-radio-answer',
  templateUrl: './q-radio-answer.component.html',
  styleUrls: ['./q-radio-answer.component.scss']
})
export class QRadioAnswerComponent implements OnInit, OnChanges {

  @Input() question: any;
  options: any = [];
  constructor() { }

  ngOnInit() {

    
  }

  ngOnChanges (){
    if (this.question){
      this.loadAlternates ();
    }
  }

  loadAlternates (){
    this.options = [];
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    for (var i=0; i < this.question.num_alternate; i++){
      var key = "alternative" + (i+1);
     // var q = this.question ["alternative" + (i+1)];
    //  var key = "alternative" + this.question.options[i];
      var q = this.question[key];
      this.options.push ({
        id: key,
        text: q,
        alternate: i+1
      });
    }
  }



}
