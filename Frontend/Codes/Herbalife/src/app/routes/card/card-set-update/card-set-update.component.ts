import { Component, OnInit } from '@angular/core';
import {CardService} from ".././card.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {CardDetail} from '../card.model';
import {NzMessageService} from 'ng-zorro-antd';

declare var qq: any;
var searchService;
var markers=[];

@Component({
  selector: 'app-card-set-update',
  templateUrl: './card-set-update.component.html',
  styleUrls: ['./card-set-update.component.css']
})
export class CardSetUpdateComponent implements OnInit {
    validateForm: FormGroup;
    //cardDetailModel:CardDetail=new CardDetail();
    
  Id=0;
  Title =null;
  WorkStart: Date | null =null;
  RestStart: Date | null =null;
  WorkStartText=null;
  RestStartText=null;
  Week=null;
  WorkRemind=null;
  RestRemind=null;
  Address:string|null=null;
  Longitude=null;
  Latitude=null;
  WorkAllowTime=null;
  RestAllowTime=null;
  AllowAddress="500";

  IsVisible=false;
  IsLoading=false;
  
//   searchService:any;
//     markers=[];

  constructor(
        private cardService: CardService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private message:NzMessageService,
        private router:Router
  ) { }

  GetCardDetail()
  {
    const id = +this.route.snapshot.paramMap.get("id");
    this.Id=id;
    if(id)
    {
        this.cardService.GetCardDetail(id).do(()=>{}).subscribe(m=>{
        if(m){
          //this.cardDetailModel=m;
            this.Title =m.Title;
            this.Week=m.Week;
            this.WorkStartText=m.WorkStart;//m.WorkStart;
            this.RestStartText=m.RestStart//m.RestStart;
            this.WorkStart=this.TimeConvertToDate(m.WorkStart);//m.WorkStart;
            this.RestStart=this.TimeConvertToDate(m.RestStart);//m.RestStart;
            this.WorkRemind=m.WorkRemind.toString();
            this.RestRemind=m.RestRemind.toString();
            this.WorkAllowTime=m.WorkAllowTime.toString();
            this.RestAllowTime=m.RestAllowTime.toString();
            this.AllowAddress=m.AllowAddress.toString();
            this.Address=m.Address;
            this.Longitude=m.Longitude;
            this.Latitude=m.Latitude;
            console.info(this.Address);
            this.initMap();
        } 
      });
    }
  }

  add()
  {
      console.info(this.WorkStartText);
      console.info(this.WorkStart);
    this.WorkStart=this.TimeConvertToDate(this.WorkStartText);
    this.RestStart=this.TimeConvertToDate(this.RestStartText);
    this.IsVisible=true;
  }

  okClose()
  {
    this.WorkStartText=this.DateConvertToString(this.WorkStart,"hh:mm");
    this.RestStartText=this.DateConvertToString(this.RestStart,"hh:mm");
    this.IsVisible=false;
  }

  cancelClose()
  {
      this.IsVisible=false;
  }

  TimeConvertToDate(time:string){
    //time="2000-01-01 "+time+":00";
    // console.info(new Date(time));
    return new Date(2000,1,1,Number(time.split(':')[0]),Number(time.split(':')[1]),0);
    //return new Date(2000,1,1,14,0,0);
  }

  /**
   * 将日期转换为指定的格式：比如转换成"年月日时分秒"这种格式：yyyy-MM-dd hh:mm:ss 或者 yyyy-MM-dd
   * @param curDate
   * @param fmt
   */
  DateConvertToString (curDate: Date, fmt?: string) {
    if (!curDate) {
      return '';
    }
    const o = {
      'M+' : curDate.getMonth() + 1,                 // 月份
      'd+' : curDate.getDate(),                      // 日
      'h+' : curDate.getHours(),                     // 小时
      'm+' : curDate.getMinutes(),                   // 分
      's+' : curDate.getSeconds(),                   // 秒
      'q+' : Math.floor((curDate.getMonth() + 3) / 3),   // 季度
      'S'  : curDate.getMilliseconds()               // 毫秒
    };
    if (!fmt) {
      fmt = 'yyyy-MM-dd';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (curDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
   for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
   }
   return fmt;
  }

  initMap()
  {
    var ln = 116.403765;
    var la = 39.914850;

    if(this.Longitude!=null)
    {
        ln=this.Longitude;
    }
    if(this.Latitude!=null)
    {
        la=this.Latitude;
    }

    var _=this;
    var map = new qq.maps.Map(
        document.getElementById("map"),
        {
            center: new qq.maps.LatLng(la, ln),
            zoom: 13
        }
    );

    qq.maps.event.addListener(
        map,
        'click',
        function (event) {
            var latlng= new qq.maps.LatLng(event.latLng.getLat(), event.latLng.getLng());
            _.Longitude=event.latLng.getLng();
            _.Latitude=event.latLng.getLat();
            geocoder.getAddress(latlng);
            marker.setPosition(latlng);
        }
    );

    var geocoder = new qq.maps.Geocoder({
        complete: function (result) {
            _.Address=result.detail.address;
        }
    });

    var marker = new qq.maps.Marker({
        position: new qq.maps.LatLng(la, ln),
        map: map,
        draggable: true
    });
    //var searchService, markers = [];
    var latlngBounds = new qq.maps.LatLngBounds();
    //设置Poi检索服务，用于本地检索、周边检索
    searchService = new qq.maps.SearchService({
        //设置搜索范围为北京
        location: "北京",
        //设置搜索页码为1
        pageIndex: 1,
        //设置每页的结果数为5
        pageCapacity: 5,
        //设置展现查询结构到infoDIV上
        //panel: document.getElementById('infoDiv'),
        //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
        autoExtend: true,
        //检索成功的回调函数
        complete: function (results) {
            //设置回调函数参数
            var pois = results.detail.pois;
            for (var i = 0, l = pois.length; i < l; i++) {
                var poi = pois[i];
                //扩展边界范围，用来包含搜索到的Poi点
                latlngBounds.extend(poi.latLng);
                var marker = new qq.maps.Marker({
                    map: map,
                    position: poi.latLng
                });

                marker.setTitle(i + 1);

                markers.push(marker);
                console.info(markers);
            }
            //调整地图视野
            map.fitBounds(latlngBounds);
        },
        //若服务请求失败，则运行以下函数
        error: function () {
            alert("出错了。");
        }
    });

  }

    //清除地图上的marker
    clearOverlays(overlays) {
        console.info(overlays);
        var overlay;
        while (overlay = overlays.pop()) {
            overlay.setMap(null);
        }
    }

  //设置搜索的范围和关键字等属性
  searchKeyword() {
        //var keyword = document.getElementById("keyword").value;
        this.clearOverlays(markers);
        //根据输入的城市设置搜索范围
        // searchService.setLocation("北京");
        //根据输入的关键字在搜索范围内检索
        searchService.search(this.Address);
    }


    submitForm(){
        var valid = true;
        for (const i in this.validateForm.controls) {
            if (true) {
                this.validateForm.controls[i].markAsDirty();
                this.validateForm.controls[i].updateValueAndValidity();
                if (this.validateForm.controls[i].valid === false) {
                valid = false;
                }
            }
        }
        if(valid)
        {
            this.IsLoading=true;
            this.cardService.UpdateCard({
                Id:this.Id,
                Title:this.Title,
                WorkStart:this.WorkStartText,
                RestStart:this.RestStartText,
                Week:this.Week==null?'':this.Week,
                WorkRemind:this.WorkRemind,
                RestRemind:this.RestRemind,
                Address:this.Address==null?'':this.Address,
                Longitude:this.Longitude,
                Latitude:this.Latitude,
                WorkAllowTime:this.WorkAllowTime,
                RestAllowTime:this.RestAllowTime,
                AllowAddress:this.AllowAddress
            }).subscribe((m) => {
            if(m.success)
            {
                this.message.success(m.result,{nzDuration:5000});
                this.router.navigate(['/card/set']);
            }else{
                this.message.warning(m.result,{nzDuration:5000});
            }
            this.IsLoading=false;
            });
        }
    }
  ngOnInit() {
    
    this.GetCardDetail();
    console.info(this.WorkStart);
    this.validateForm = this.fb.group({
        Title  : [ this.Title,[Validators.required,Validators.maxLength(500)]],
        Week  : [ this.Week,[,Validators.maxLength(1000)]],
        WorkStart:[ this.WorkStart,[Validators.required]],
        RestStart:[ this.RestStart,[Validators.required]],
        WorkRemind:[ this.WorkRemind,[Validators.required]],
        RestRemind:[ this.RestRemind,[Validators.required]],
        WorkAllowTime:[ this.WorkAllowTime,[Validators.required]],
        RestAllowTime:[ this.RestAllowTime,[Validators.required]],
        AllowAddress:[ this.AllowAddress,[Validators.required]],
        Address:[ this.Address,[Validators.maxLength(500)]],
        Longitude:[ this.Longitude,[Validators.pattern(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/)]],
        Latitude:[ this.Latitude,[Validators.pattern(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/)]]
    });

    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
  }

}
