import { Component, OnInit,ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzMessageService,NzTreeNodeOptions,NzModalService  } from 'ng-zorro-antd';
import {CardService} from ".././card.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CardUserDto,SetCardUserModel} from '../card.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-card-set-user',
  templateUrl: './card-set-user.component.html',
  styleUrls: ['./card-set-user.component.css']
})
export class CardSetUserComponent implements OnInit {

  Id=0;
  @ViewChild('regionTree') regionTree: NzTreeComponent;
  @ViewChild('regionTree2') regionTree2: NzTreeComponent;
  // form表单，用来验证各个字段
  validateForm: FormGroup;
  RegionNodes: NzTreeNode[];
  GroupDataSet:CardUserDto[];
  RegionNodes2: NzTreeNode[];
  RegionUserList:CardUserDto[];
  RegionUserDataSet:CardUserDto[];
  SelectedCardUsersList:CardUserDto[];
  // 部门树选中节点
  checkedDepartKeys = [];
  // Group选中节点
  checkedGroupKeys = [];
  checkedUserKeys=[];

  IsLoading=false;

  constructor(
      private cardService: CardService,
      private route: ActivatedRoute,
      private message:NzMessageService,
      private fb: FormBuilder,
      private router:Router,
      private modalService :NzModalService
  ) { }

  InitSetCardUser()
  {
    const id = +this.route.snapshot.paramMap.get("id");
    this.Id=id;
    if(id)
    {
      this.cardService.InitSetCardUser(id).do(()=>{}).subscribe(m=>{
        if(m){
          const RegionNodes=this.RegionNodes=[];
          m.RegionNodes.forEach(function(item){
            RegionNodes.push(new NzTreeNode({
              title: item.title,
              key: item.key,
              isLeaf: item.isLeaf,
              disabled: item.disabled,
              children: item.children
            }));
          });
          
          this.checkedDepartKeys=m.checkedDepartKeys;
          this.GroupDataSet=m.GroupList;
          this.checkedGroupKeys=m.checkedGroupKeys;
          this.RegionNodes2=this.RegionNodes;
          this.checkedUserKeys=m.checkedUserKeys;
          this.RegionUserList=m.RegionUserList;
          this.SelectedCardUsersList=m.SelectedCardUsersList;
        } 
      });
    }
  }

  clickNode2(obj)
  {
    var regionID=Number(obj.node.key);
    // if(obj.node.isLeaf)
    // {
      this.RegionUserDataSet=this.RegionUserList.filter(function(m){return m.RegionID==regionID});
      //console.info(regionID);
    //}
  }

  submitForm(){
    
    const checkedNodes = this.regionTree.getCheckedNodeList();
    const checkedNodeIds = [];
    
    checkedNodes.forEach(function(item) {
      //如果有子节点，需要将子节点加入（本身是父节点，总共3层）
      if (!item.isLeaf && item.children) {
        //第一层
        checkedNodeIds.push(Number(item.key));
        item.children.forEach(function(item2) {
          //第二层
          checkedNodeIds.push(Number(item2.key));
          //第三层
          if(!item2.isLeaf && item2.children )
          {
              item2.children.forEach(function(item3) {
                checkedNodeIds.push(Number(item3.key));
              });
          }else  if (item2.isLeaf){
              checkedNodeIds.push(Number(item2.key));
          }
        });
      } else if (item.isLeaf) {
        checkedNodeIds.push(Number(item.key));
      }
    });
    //去重
    var distinctCheckedNodeIds = checkedNodeIds.filter(function(element,index,self){
      return self.indexOf(element) === index;
    });

    const selectedGroupIds:number[]=this.GroupDataSet.filter(function(m){return m.IsChecked}).map(function(m){return m.ID});
    const selectedUserIds:number[]=this.RegionUserList.filter(function(m){return m.IsChecked}).map(function(m){return m.ID});
    console.info(selectedGroupIds);
    console.info(selectedUserIds);
    var model:SetCardUserModel=new SetCardUserModel();
    model.cardId=this.Id;
    model.selectedRegionIds=distinctCheckedNodeIds.length==0?null:distinctCheckedNodeIds;
    model.selectedGroupIds=selectedGroupIds.length==0?null:selectedGroupIds;
    model.selectedUserIds=selectedUserIds.length==0?null:selectedUserIds;

    //提交
    this.IsLoading=true;
    this.cardService.GetRepeatCardUser(model).subscribe((m) => {
          if(m.success)
          {
            this.modalService.create({
              nzTitle:"确认更新",
              nzContent:m.result,
              nzOnOk:()=>{
                this.IsLoading=true;
                this.cardService.SetCardUser(model).subscribe((m2) => {
                  if(m2.success)
                  {
                    this.message.success(m2.result,{nzDuration:5000});
                    this.router.navigate(['/card/set']);
                  }
                  else{
                    this.message.warning(m2.result,{nzDuration:5000});
                  }
                  this.IsLoading=false;
                });
              }
            });
          }else{
            this.message.warning(m.result,{nzDuration:5000});
          }
          this.IsLoading=false;
        });

  }

  ngOnInit() {

    this.InitSetCardUser();
    this.validateForm= this.fb.group({
    });
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
