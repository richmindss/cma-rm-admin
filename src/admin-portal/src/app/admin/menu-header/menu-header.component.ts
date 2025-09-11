import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {

  @Input() language:any;
  constructor() { }

  ngOnInit() {
  }

}
