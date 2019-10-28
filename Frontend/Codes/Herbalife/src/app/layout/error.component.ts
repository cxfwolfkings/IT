import { Component, OnInit, ViewChild } from '@angular/core';
import { MiddleComponent } from './middle/middle.component';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})

export class ErrorComponent implements OnInit {

  @ViewChild(MiddleComponent) menus: MiddleComponent;

  constructor() { }

  ngOnInit() {
    /*
    const clearMenuId = setInterval(_ => {
      if (this.menus) {
        clearInterval(clearMenuId);
        this.menus.CurrentMenuList = [];
      }
    }, 60);
    */
  }

}
