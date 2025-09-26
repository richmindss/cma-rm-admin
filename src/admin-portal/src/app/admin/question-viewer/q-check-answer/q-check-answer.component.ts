import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-q-check-answer',
  templateUrl: './q-check-answer.component.html',
  styleUrls: ['./q-check-answer.component.scss']
})
export class QCheckAnswerComponent implements OnInit {

  
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
      var q = this.question ["alternative" + (i+1)];
      this.options.push ({
        id: letters[i],
        text: q,
        alternate: i+1
      });
    }
  }


}
