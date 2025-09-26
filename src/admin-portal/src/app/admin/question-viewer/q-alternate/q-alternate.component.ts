import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-q-alternate',
  templateUrl: './q-alternate.component.html',
  styleUrls: ['./q-alternate.component.scss']
})
export class QAlternateComponent implements OnInit {

  @Input() question: any;
  @Input() option:any;
  imgUrl:any;
  
  constructor() { }

  ngOnInit() {
  }

  getAlternate (){
    if(this.question['atype1'] =="image" || this.question['atype2'] =="image" || this.question['atype3'] =="image" ||this.question['atype4'] =="image"){
     return this.imgUrl = this.question['alternative' + this.option.alternate];
    }
  }

}
