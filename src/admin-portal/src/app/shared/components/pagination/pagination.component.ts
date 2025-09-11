import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalRecords: number;
  @Input() pageSize: number ;
  @Input() currentPage: number;

  // @Output() pageClick: EventEmitter<any> = new EventEmitter<any> ();
  // @Output() nextClick: EventEmitter<any> = new EventEmitter<any> ();
  // @Output() prevClick: EventEmitter<any> = new EventEmitter<any> ();

  @Output() pageChanged: EventEmitter<any> = new EventEmitter<any> ();

  constructor() { }

  ngOnInit() {
  }

  onPageChanged(){
    this.pageChanged.emit (this.currentPage);
  }

}
