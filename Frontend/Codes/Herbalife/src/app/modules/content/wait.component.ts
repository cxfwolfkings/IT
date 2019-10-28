import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.component.html'
})

export class WaitComponent implements OnInit {

  @Input() isVisible;

  constructor() { }

  ngOnInit() {
  }

}
