import { Component, OnInit, Input } from '@angular/core';



declare var google:any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() chartOpts:any;  
  @Input() chartData:any;
  @Input() chartContainer:any;

  constructor() { }

  ngOnInit() {

    google.charts.load('current', {packages: ['corechart']});
    var self = this;
    google.charts.setOnLoadCallback(function(){
      self.drawChart ();
    });


    console.log ("here is charts data .", this.chartOpts);
  }

  drawChart (){
    console.log ("onload called...");

    if (this.chartOpts.chartType == 'ColumnChart'){
      this.buildColumn ();
    }else if (this.chartOpts.chartType == "PieChart"){
      this.buildPie ();
    }
    // this.chartOpts.containerId = this.chartContainer;
    // var wrapper = new google.visualization.ChartWrapper
      (this.chartOpts);
    // wrapper.draw();
/*

 chartType: 'ColumnChart',
      dataTable: [['', 'Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
                  ['', 700, 300, 400, 500, 600, 800]],
      options: {'title': 'Countries'}
*/

    // var data = new google.visualization.DataTable();

    // if (this.chartOpts.dataTable){
    //   for (var i=0; i<this.chartOpts.dataTable.length; i++){
    //     var row = this.chartOpts.dataTable [i];
    //     if (i==0){
    //       data.addColumn('string', );
    //       data.addColumn('number', 'Percentage');
    //     }
    //   }
    // }
    // data.addColumn('string', 'Element');
    // data.addColumn('number', 'Percentage');
    // data.addRows([
    //   ['Nitrogen', 0.78],
    //   ['Oxygen', 0.21],
    //   ['Other', 0.01]
    // ]);

    // // // Instantiate and draw the chart.
    // var chart = new google.visualization.PieChart(document.getElementById(this.chartContainer));
    // chart.draw(this.data, null);

  }


  buildColumn (){
    var data = google.visualization.arrayToDataTable(this.chartData);

    var chart = new google.visualization.ColumnChart
    (document.getElementById(this.chartContainer));
      chart.draw(data, this.chartOpts);

  }

  buildPie(){
    var data = google.visualization.arrayToDataTable(this.chartData);

    var chart = new google.visualization.PieChart
    (document.getElementById(this.chartContainer));
      chart.draw(data, this.chartOpts);
  }

  onReady(){
    console.log ("chart is ready");
  }

  onError (e){
    console.log ("error in chart ", e);
  }

  onSelect (e){
console.log ("on selected ...", e);
  }

}
