import { Component, OnInit } from '@angular/core';
import { EmitService } from '../../../services/EmitService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer: String;
  constructor(public emitService: EmitService) { }

  ngOnInit() {
    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === 'MenuList') {
        this.footer = JSON.parse(sessionStorage.getItem('footer'));
      }
    });
  }

}
