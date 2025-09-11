import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
 
@Component({
  selector: 'app-datefield',
  templateUrl: './datefield.component.html',
  styleUrls: ['./datefield.component.scss']
})
export class DatefieldComponent implements OnInit, OnChanges {



  @Input() holdFuture:any = false;
  @Input() maxDate:any;
  @Input () minDate:any;
  @Input() data:any;
  @Input() placeholder:any;
  

  @Output() dataChange = new EventEmitter ();

  bsConfig = { dateInputFormat: 'DD/MM/YYYY' };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges (){
    if (!this.maxDate  && !this.holdFuture){

      this.maxDate = new Date ();
    }
  }

  onModelChange (e){
    this.dataChange.emit (this.data);
  }

}
