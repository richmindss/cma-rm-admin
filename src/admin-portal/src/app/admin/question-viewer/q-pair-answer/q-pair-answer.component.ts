import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-q-pair-answer',
  templateUrl: './q-pair-answer.component.html',
  styleUrls: ['./q-pair-answer.component.scss']
})
export class QPairAnswerComponent implements OnInit {

  @Input() question: any;
  rows: any = [];
  cols: any = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.question) {
      this.loadAlternates();
    }
  }

  loadAlternates() {
    this.rows = [];
    this.cols = [];

    var parts = this.question.num_alternate.split("|");
    var numRows = +parts[0];
    var numCols = +parts[1];

    for (var i = 0; i < numRows; i++) {
      var q = this.question["alternative" + (i + 1)];
      this.rows.push({
        id: i,
        text: q
      });
    }

    for (var j = numRows; j < numRows + numCols; j++) {
      var q = this.question["alternative" + (j + 1)];
      this.cols.push({
        id: j,
        text: q
      });
    }

  }


}
