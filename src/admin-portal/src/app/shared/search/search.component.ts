import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter<any> ();
  @Input() filter: any;
   

  constructor() { }

  ngOnInit() {
  }


  searchClick (){
    this.search.emit ();
  }

}
