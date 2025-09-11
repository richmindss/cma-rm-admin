import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-status',
  templateUrl: './candidate-status.component.html',
  styleUrls: ['./candidate-status.component.scss']
})
export class CandidateStatusComponent implements OnInit {

  chartOpts:any;
  chartData:any;

 

  constructor() { }

  ngOnInit() {

    this.chartData = [
      ["Element", "Density" ],
      ["Copper", 8.94],
      ["Silver", 10.49],
      ["Gold", 19.30],
      ["Platinum", 21.45]
    ]; //from api .



    this.chartOpts = {
      chartType: 'ColumnChart',
      options: {'title': 'Countries', height: 400, width: '90%'}
    };
  }

}
