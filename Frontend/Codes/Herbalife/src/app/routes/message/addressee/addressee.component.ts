import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import {environment} from "../../../../environments/environment"
import {MessageService,PreAppDto} from "../message.service";
//import { join } from 'path';

@Component({
  selector: 'app-addressee',
  templateUrl: './addressee.component.html',
  styleUrls: ['./addressee.component.css']
})
export class AddresseeComponent implements OnInit {
  abc="1";
  optionList = [];
  grouplist=[];
  isLoading = false;
  //选取的组Ids
  selectedGroup=[];
  //选取的人员Ids
  selectedUser=[];
  //选取的AgentId
  selectAgentId=0;
  //选取的应用名称
  @Input() selectAgentName;
  @Input() isContentCall = false;

  waitselectAgentId=0;
  waitselectAgentName="";
  

  defaultName:string="";
  defaultUserIds:string="";
  defaultGroupIds:string="";
  selectindex=-1;

  defalutGroupName:string="";

  selectUserUrl="";
  selectGroupUrl="";
  //selectGroupUrl = environment.SERVER_URL+"/GroupManagement/HLoadAppGroups?appid=3&selectedGroup="+this.selectedGroup;

  fGroupUrl(name)
  {
    return this.selectGroupUrl = environment.SERVER_URL+"/GroupManagement/HLoadAppGroups?appid=3&selectedGroup="+name;
  }
  
  usersearchChange$ = new BehaviorSubject('');
  groupsearchChange$ = new BehaviorSubject('');

  @Input() actionStr="";
  isVisible = false;
  applist = [];

  constructor(private http: HttpClient,private messageService :MessageService) { 
  }

  ngOnInit() {    
    this.GetAppList(); 
    this.loadUser();
    this.loadgroup();
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  fUserUrl(appid,name,selectedUserIds,userIds)
  {
    return this.selectUserUrl=environment.SERVER_URL+"/UserMangement/HGetMessageRecipentAppUsersDynamic?appid=3&name="
    +name+"&selectedUserIds="
    +selectedUserIds+"&userIds="
    +userIds;
  }

   /*弹出层方法*/

   GetAppList(){
    this.messageService.GetAppList({WechatAccountID:1}).do(()=>{         
    }).subscribe(m=> {     
      this.applist=m.items
    });
   }

   chooseApp(appid,name,index):void{
    // debugger
    //this.selectAgentId=appid;
    //this.selectAgentName=name;
    
    this.waitselectAgentId=appid;
    this.waitselectAgentName=name;
    this.selectindex=index;    
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    //console.log('Button ok clicked!');
  
    this.selectAgentId=this.waitselectAgentId;
    this.selectAgentName=this.waitselectAgentName;
    this.isVisible = false;
  }

  handleCancel(): void {
    //console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  deleteApp():void{
    this.selectAgentId=0;
    this.selectAgentName=null;
  }

 /*弹出层方法__End*/

  ongroupSearch(value: string): void {
    this.defalutGroupName=value;
    this.isLoading = true;
    this.groupsearchChange$.next(value);
  }
  loadgroup()
  {
    
    const getRandomNameList = (name: string) => 
    //this.http.get(`${this.selectGroupUrl}`
    this.http.get(`${this.fGroupUrl(encodeURIComponent(this.defalutGroupName))}`
    ).pipe(map((res: any) => res.results)).pipe(map((list: any) => {
      //return list.map(item => `${item.name}`);   
      return list;
    }));

    const grouplist$: Observable<string[]> = 
      this.groupsearchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getRandomNameList));
      grouplist$.subscribe(data => {      
      //console.log(data);
      this.grouplist = data;
      this.isLoading = false;
    });
  }
  changeuser(value:string[]):void{
    this.selectedUser=value.map(function(data){
        return +data;
    });
  }
  changegroup(value:string[]):void{
    this.selectedGroup=value.map(function(data){
      return +data;
    });
  }

  onUserSearch(value: string): void { 
    this.defaultName=value;
     this.isLoading = true;
     this.usersearchChange$.next(value);
  }


loadUser(){
   
    const getRandomNameList = (Name: string,Id:number) => 
    //this.http.get(`${this.selectUserUrl}`
    this.http.get(`${this.fUserUrl('',encodeURIComponent(this.defaultName),this.defaultUserIds,this.defaultUserIds)}`
    ).pipe(map((res: any) => res.results)).pipe(map((list: [any]) => {  
      return list; 
    }));

    //const optionList$: Observable<string[]> = 
    const optionList$: Observable<any[]> = 
      this.usersearchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {       
      //console.log("show"+data);
      this.optionList = data;
      this.isLoading = false;
    });
  }




}
