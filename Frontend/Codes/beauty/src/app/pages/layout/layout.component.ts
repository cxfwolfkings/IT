import { Component, OnInit } from '@angular/core';

// import {HttpClient,HttpParams} from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import {environment} from "../../environments/environment"

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  // protected http: HttpClient
  // public  GetAppAccountInfo() {
  //   const url = environment.SERVER_URL+"/API/App/GetAppAccountInfo";
  //    this.http.post(url,{}).subscribe(res=> {
  //       console.log(res);
  //   })
  // };   

  ngOnInit() {
  }

}