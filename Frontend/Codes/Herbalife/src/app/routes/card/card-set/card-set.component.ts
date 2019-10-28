import { Component, OnInit,ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {CardService} from ".././card.service";
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import {NoCardUser,RegionFmt} from '../card.model';
import {NzMessageService,NzModalService,UploadFile} from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-set',
  templateUrl: './card-set.component.html',
  styleUrls: ['./card-set.component.css']
})
export class CardSetComponent implements OnInit {

  //@ViewChild('nzTree') nzTree: NzTreeComponent;

  //nodes: NzTreeNode[];
  loading = false;
  dataSet = [];
  //selectKey=0;
  //NodeText="";

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  //NoCardUserDataSet=[];
  //NoCardUserDetail:NoCardUser=new NoCardUser();
  //NoCardUserDetailIsVisible=false;

  //addIsLoading=false;
  //IsAddVisible=false;

  //Name='';
  //CardRegionOption="";
  //validateAddForm:FormGroup;

  addCardIsLoading=false;
  IsAddCardVisible=false;
  exportUrl=environment.SERVER_URL + '/Template/模板示例.xlsx';
  uploadUrl = environment.SERVER_URL + "/Card/AddUser?IsConfirm=false&id=";
  //uploadUrl=environment.SERVER_URL+"/File/UploadContent?isMaterialSave=false&fileType=3";

  UploadFileName:string;
  fjFileUrl=[];

  CardName='';
  validateAddCardForm:FormGroup;
  //validateForm:FormGroup;

  constructor(
    private cardService: CardService,
    private fb: FormBuilder,
    private message:NzMessageService,
    private modalService :NzModalService
  ) { }


  // getNodes() {
  //   this.cardService.getFirstRegionList().subscribe(m => {
  //     const nodes = this.nodes = [];
  //     var childrenNodes=[];
  //     m.forEach((v, i) => {
  //       if(Number(v.ID)==this.selectKey)
  //         {
  //           this.NodeText=v.Name;
  //         }
  //         childrenNodes.push({
  //           key:v.ID,
  //           title:v.Name,
  //           children: null,
  //           disabled: false,
  //           isLeaf: true
  //         });
  //     });
  //     //未分配用户
  //     childrenNodes.push({
  //           key:-1,
  //           title:"未分配用户",
  //           children: null,
  //           disabled: false,
  //           isLeaf: true
  //         });
  //     //添加新分类
  //     childrenNodes.push({
  //       key:-2,
  //       title:"添加新分类",
  //       children: null,
  //       disabled: false,
  //       isLeaf: true
  //     });
  //     nodes.push(new NzTreeNode({
  //         key: "0",
  //         title: "康宝莱企业号",
  //         isLeaf: false,
  //         disabled: false,
  //         children: childrenNodes
  //     }));

  //     console.info(nodes);
  //   });
  // }

  // clickNode(obj){
  //     var key=Number(obj.node.key);
  //     this.selectKey=key;
  //     this.NodeText=obj.node.origin.title;
  //     if(key>0)
  //     {
  //       //展示右侧
  //       this.GetCardsByRegionId(key);
  //     }else if(key==-1)
  //     {
  //       //未分配新用户
  //       this.PageNoCardUserList();
  //     }else if(key==-2){
  //       //添加新分类
  //       this.IsAddVisible=true;
  //       this.CardRegionOption="add";
  //     }
  // }

  //展示Card列表
  GetPagedCards()
  {
    this.loading = true;
    this.cardService.GetPagedCards({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'Id',
      order: 'desc'
    }).subscribe(p => {
      this.loading = false;
      this.total = p.totalCount;
      this.dataSet = p.items;
    });
  }

  //未分配用户列表
  // PageNoCardUserList()
  // {
  //   this.loading = true;
  //   this.cardService.PageNoCardUserList({
  //     offset: (this.pageIndex - 1) * this.pageSize,
  //     limit: this.pageSize,
  //     sort: 'ID',
  //     order: 'asc'
  //   }).subscribe(p => {
  //     this.loading = false;
  //     this.total = p.totalCount;
  //     this.NoCardUserDataSet = p.items;
  //   });
  // }

  // GetNoCardUserDetail(id){
  //   if(this.selectKey==-1)
  //   {
  //     this.NoCardUserDetail=new NoCardUser();
  //     this.cardService.GetNoCardUserDetail(id).subscribe(u => {
  //       this.NoCardUserDetail = u;
  //       this.NoCardUserDetailIsVisible = true;
  //     });
  //   }else{
  //     this.NoCardUserDetailIsVisible = false;
  //   }

  // }

  // closeNoCardUserModal(){
  //   this.NoCardUserDetailIsVisible = false;
  // }

  // closeAdd()
  // {
  //   this.IsAddVisible=false;
  // }

  closeAddCard()
  {
    this.IsAddCardVisible=false;
  }

  // //新增/修改CardRegion
  // submitAddForm()
  // {
  //   var valid = true;
  //   for (const i in this.validateAddForm.controls) {
  //     if (true) {
  //       this.validateAddForm.controls[i].markAsDirty();
  //       this.validateAddForm.controls[i].updateValueAndValidity();
  //       if (this.validateAddForm.controls[i].valid === false) {
  //         valid = false;
  //       }
  //     }
  //   }
  //   if (valid) {
  //       this.addIsLoading=true;
  //       var id=0;
  //       if(this.CardRegionOption=="edit"&&this.selectKey>0)
  //       {
  //         id=this.selectKey;
  //       }
  //       this.cardService.AddCardRegion({
  //         ID:id,
  //         Name:this.Name
  //       }).subscribe((m) => {
  //         if(m.success)
  //         {
  //           this.message.success(m.result,{nzDuration:5000});
  //           this.getNodes();
  //           this.IsAddVisible=false;
  //         }else{
  //           this.message.warning(m.result,{nzDuration:5000});
  //         }
  //         this.addIsLoading=false;
  //       });
  //   }
  // }

  //新增Card
  submitAddCardForm()
  {
    var valid = true;
    for (const i in this.validateAddCardForm.controls) {
      if (true) {
        this.validateAddCardForm.controls[i].markAsDirty();
        this.validateAddCardForm.controls[i].updateValueAndValidity();
        if (this.validateAddCardForm.controls[i].valid === false) {
          valid = false;
        }
      }
    }
    if (valid) {
        this.addCardIsLoading=true;
        this.cardService.AddCard({
          Name:this.CardName
        }).subscribe((m) => {
          if(m.success)
          {
            this.message.success(m.result,{nzDuration:5000});
            this.GetPagedCards();
            this.IsAddCardVisible=false;
          }else{
            this.message.warning(m.result,{nzDuration:5000});
          }
          this.addCardIsLoading=false;
        });
    }
  }

  // openCardRegionEdit()
  // {
  //   this.IsAddVisible=true;
  //   this.CardRegionOption="edit";
  // }

  openCardAdd()
  {
    this.validateAddCardForm.reset();
    // for (const i in this.validateAddCardForm.controls) {
    //   if (true) {
    //     this.validateAddCardForm.controls[i].valid =true;
    //     // this.validateAddCardForm.controls[i].markAsDirty();
    //     // this.validateAddCardForm.controls[i].updateValueAndValidity();
    //     // if (this.validateAddCardForm.controls[i].valid === false) {
    //     //   valid = false;
    //     // }
    //   }
    // }
    this.IsAddCardVisible=true;
  }

  // deleteCardRegion()
  // {
  //   this.modalService.confirm({
  //     nzTitle:'<i>将会删除规则下的所有打卡设置，是否确定删除?</i>',
  //     nzContent:'',
  //     nzOnOk:()=>{
  //       if(this.selectKey>0)
  //       {
  //         this.cardService.DeleteCardRegion(this.selectKey).subscribe(m=>{
  //           this.message.success(m.result,{nzDuration:5000});
  //           this.getNodes();
  //           this.selectKey=0;
  //         });
  //       }
  //     }
  //   });
  // }

  deleteCard(id)
  {
    this.modalService.create({
      nzTitle:'确认删除',
      nzContent:'将会删除规则下的所有打卡设置，是否确定删除?',
      nzOnOk:()=>{
        if(id>0)
        {
          this.cardService.DeleteCard(id).subscribe(m=>{
            this.message.success(m.result,{nzDuration:5000});
            this.GetPagedCards();
          });
        }
      }
    });
  }

  fdelete=(file: UploadFile) => {
      return true;
  };

  UploadData=(file: UploadFile) => {
  };

  beforeUploadtext = (file: File) => {
    const isxls = file.type === 'application/vnd.ms-excel';
    const isxlsx = file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
    if (!isxls&&!isxlsx) {
      this.message.error('导入文件格式为xls,xlsx!');
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      this.message.error('附件必须小于20MB!');
    }
    return (isxls||isxlsx)  && isLt2M;
  }  


    //handleChange(info: { file: UploadFile }): void {
handleChange(Id:number,info: any): void { 
  const fileList = info.fileList;
  if (info.file.response) {
    info.file.url = info.file.response.url;
  }

    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      //this.loading = false;
      var m=info.file.response;
      // if(m.success)
      // {
      //   this.message.success(m.result,{nzDuration:5000});
      // }else{
      //   this.message.warning(m.result,{nzDuration:5000});
      // }
      
      if(m.result.StatusCode==1)//直接导入
        {
          var formData:FormData=new FormData();
          formData.append("id",Id.toString());
          formData.append("IsConfirm","true");
          formData.append("File",info.file.originFileObj);
          this.cardService.AddUser(formData).subscribe((mm) => {
            console.info(mm);
              if(mm.StatusCode==1)//直接导入
              {
                this.message.success(mm.result,{nzDuration:5000});
              }else{
                this.message.warning(mm.result,{nzDuration:5000});
              }
              this.loading = false;
          });
        }
        else if(m.result.StatusCode==2)//确认提交？
        {
          this.modalService.create({
            nzTitle:'确认提交',
            nzContent:m.result.result,
            nzOnOk:()=>{
              var formData:FormData=new FormData();
              formData.append("id",Id.toString());
              formData.append("IsConfirm","true");
              formData.append("File",info.file.originFileObj);
              this.cardService.AddUser(formData).subscribe((mm) => {
                  if(mm.StatusCode==1)//直接导入
                  {
                    this.message.success(mm.result,{nzDuration:5000});
                  }else{
                    this.message.warning(mm.result,{nzDuration:5000});
                  }
                  this.loading = false;
              });
            },
            nzOnCancel:()=>{
              this.loading = false;
            }
          });
        }
        else//错误
        {
          this.message.warning(m.result.result,{nzDuration:5000});
          this.loading = false;
        }
    }
    if (info.file.status === 'removed') {  
      //console.info(info.file.status);   
        //this.messageService.RemoveFile(info.file.response); 
    }
  }

  ngOnInit() {
    //this.getNodes();
    // this.validateAddForm = this.fb.group({
    //   Name: [null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9\u4e00-\u9fa5]*$/)]]
    // });

    this.GetPagedCards();
    this.validateAddCardForm = this.fb.group({
      CardName: [null, [Validators.maxLength(500),Validators.required,Validators.pattern(/^[a-zA-Z0-9\u4e00-\u9fa5]*$/)]]
    });
    // this.validateForm = this.fb.group({
    // });

    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
