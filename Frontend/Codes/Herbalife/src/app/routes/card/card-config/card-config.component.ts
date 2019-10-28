import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { NzModalService} from 'ng-zorro-antd';
import {CardConfigModel} from '../card.model';
import {CardService} from '../card.service';

@Component({
  selector: 'app-card-config',
  templateUrl: './card-config.component.html',
  styleUrls: ['./card-config.component.css']
})
export class CardConfigComponent implements OnInit {

  constructor(
    private cardService:CardService,
    private fb: FormBuilder
  ) { }
  //列表展示数据变量
  cardConfigModelList: CardConfigModel[];
  isVisible = false;
  isOkLoading = false;
  //编辑MOdel的变量
  cardConfigModel:CardConfigModel;
  validateForm:FormGroup;
  ConfigValue:string=null;
  
  editCardConfig(data:CardConfigModel):void{
    this.isVisible=true;
    this.cardConfigModel=data;
    this.ConfigValue=data.ConfigValue;
    this.cardConfigModel.ConfigValue=this.cardConfigModel.ConfigValue==null?'':this.cardConfigModel.ConfigValue;
  }

  handleOk(): void {

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
    if (valid) 
    {
        this.isOkLoading = true;
        this.cardConfigModel.ConfigValue=this.ConfigValue;

        if(this.cardConfigModel.ConfigType===1){
          this.cardService.updateUrlConfig(this.cardConfigModel).subscribe(m=>{
            this.isOkLoading=this.isVisible=false;
            this.getCardConfigList();
          })
        }else if(this.cardConfigModel.ConfigType===2){
          this.cardService.addGmPosition(this.cardConfigModel).subscribe(m=>{
            this.isOkLoading=this.isVisible=false;
            this.getCardConfigList();
          })
        }
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  //获取cardConfig数据
  getCardConfigList():void{
    this.cardService.getCardConfigList().subscribe(m=>{
      this.cardConfigModelList=m;
    });
  }

  //GmPosition设置，|分割的分项字数不得超过200
  checkSplitConfigValueLength= (control: FormControl): { [s: string]: boolean } => {
    if(this.cardConfigModel.ConfigType===2)
    {
      if (this.ConfigValue.split("|").filter(function(m){return m.length>200}).length>0) 
        return { checkSplitValue: true, error: true };
      else 
        return null;
    }else{
      return null;
    }

     //return { checkRepeatName: false, error: false };;
  }

  ngOnInit() {
    this.getCardConfigList();
    //初始编辑的Model
    this.cardConfigModel=new CardConfigModel();
    this.cardConfigModel.ID=0;
    this.cardConfigModel.ConfigItem='';
    this.cardConfigModel.ConfigType=0;
    this.cardConfigModel.ConfigValue='';

    this.validateForm = this.fb.group({
      ConfigValue: [null, [Validators.maxLength(500),this.checkSplitConfigValueLength]]
    });
  }

}
