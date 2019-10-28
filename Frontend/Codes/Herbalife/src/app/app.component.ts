import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LocalStorage } from './core/local.storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {EmitService} from './core/services/EmitService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  // private ls: LocalStorage;

  public eventEmit: any;
  constructor(private LSData: LocalStorage, private http: HttpClient, public emitService: EmitService,
    private router: Router) {

  }

  ngOnInit() {
    console.log('执行1111');
    // this.setMessage();
    this.GetAppAccountInfo();
  }

  /*
  setMessage(){//举例
    console.log("执行222");
    const json = [{userName:'123',pass:'abc'}];
    //this.LSData.setObject('userMsg',json);//存储到LocalStorage
  }
  */

  public GetAppAccountInfo() {
    const url = environment.SERVER_URL + '/App/HGetAppAccountInfo';
    this.http.get(url, {}).subscribe(res => {
      if (res['error']) {
        sessionStorage.setItem('AppAccountInfo', 'invalid user');
        this.router.navigate(['/error']);
      } else {
        // let a=this.emitService;
        // setTimeout(function () {
        // debugger
        sessionStorage.setItem('AppAccountInfo', JSON.stringify(res['data']));
        sessionStorage.setItem('CurrentMenuList', JSON.stringify(res['data'][0].permissionIds));
        sessionStorage.setItem('footer', JSON.stringify(res['data'][0].footer));
        // console.log('fasong');
        // this.emitService.eventEmit.emit('MenuList');
        // }, '5000');
        // alert(res["data"].length);
        // console.log(res);
      }
    });
  }

}
