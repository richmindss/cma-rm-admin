import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.scss']
})
export class MenuFooterComponent implements OnInit {

  @Input() language:any;
  constructor() { }

  ngOnInit() {
  }

}
