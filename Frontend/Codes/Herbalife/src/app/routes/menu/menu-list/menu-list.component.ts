import { Component, OnInit } from '@angular/core';
import { MenuService} from '../menu.service';
import { NzModalService, NzMessageService} from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
export interface TreeNodeInterface {
  ID: number;
  PermissonString: string;
  SortOf: number;
  SourceType: number;
  Url: string;
  Name: string;
  ParentId: number;
  Children?: TreeNodeInterface[];
}

declare var $: any;

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  expandDataCache = {};

  constructor(private menuService:MenuService,
              private modalService :NzModalService,
              private message: NzMessageService,
              private router: Router,) { }
  data = [];
  ngOnInit(): void {
    this.getMenuList();
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  fupdate(ID: number, PID: number) {
    this.router.navigate(['/menu/operation', {'id': ID, 'ParentId': PID}], { fragment: 'top' });
  }
  showConfirm(ID:number):void{
    this.modalService.create({
      nzTitle:'确认删除',
      nzContent:'是否确认删除？',
      nzOnOk:()=>{
        if(this.isExistChild(null,ID)){
          this.deleteMenu(ID);
        }
        else{
          const modal=this.modalService.warning({
            nzTitle:'该菜单有子项，不能够删除！',
            nzContent:''
          });
          window.setTimeout(() => modal.destroy(), 1000);
        }
      }
    });
  }
  showConfirmForFirstMenu(ID:number):void{
    this.modalService.create({
      nzTitle:'确认删除',
      nzContent:'是否确认删除？',
      nzOnOk:()=>{
        if(this.isExistChild(null,ID)){
          this.deleteMenuForFirst(ID);
        }
        else{
          const modal=this.modalService.warning({
            nzTitle:'该菜单有子项，不能够删除！',
            nzContent:''
          });
          window.setTimeout(() => modal.destroy(), 10000);
        }
      }
    });
  }

  private isExistChild(item:TreeNodeInterface,ID:number):boolean{
    let fag=true;
    if(item===null){
      this.data.forEach(m=>{
        if(m.ID===ID){
          if(m.Children.length>0) {
            fag=false;
            return;}
          else{
            fag=true;
            return;
          }
        }
        else{
          this.isExistChild(m,ID);
        }
      });
    }
    else{
      item.Children.forEach(m=>{
        if(m.ID===ID){
          if(m.Children.length>0) {
            fag=false;
            return;}
          else{
            fag=true;
            return;
          }
        }
        else{
          this.isExistChild(m,ID);
        }
      });
    }
    return fag;
  }

  private deleteMenu(ID:number):void{
      this.menuService.deleteMenu(ID).subscribe(m=>{
        this.message.success("删除成功");
        this.getMenuList();
      });  
  }
  
  private deleteMenuForFirst(ID:number):void{
    this.menuService.deleteFirstMenu(ID).subscribe(m=>{
      this.getMenuList();
    });  
}
  private getMenuList(): void {
    this.menuService.getMenuList().do(() => {}).subscribe(m => {
      this.data = m.items;
      let replaceTimes = 0;
      const replaceId = setInterval(function() {
        const maxTimes = m.items.filter(_ => _.ParentId).length;
        if (replaceTimes < maxTimes) {
          $('.ant-table-tbody tr td').each(function(index, item) {
            let label = $(item).html();
            if (label.indexOf('\t\t\t\t') >= 0) {
              $(item).html('');
              label = label.replace(/\t\t\t\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
              $(item).append(label);
              replaceTimes++;
            }
          });
        } else {
          clearInterval(replaceId);
          console.log('load menu table finish');
        }
      }, 60);
      /*
      this.data.forEach(item => {
        this.expandDataCache[item.ID] = this.convertTreeToList(item);
      });
      */
    });
  }
  /*
  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.Children) {
        for (let i = node.Children.length - 1; i >= 0; i--) {
          stack.push({...node.Children[ i ], level: node.level + 1, expand: true, parent: node });
        }
      }
    }
    return array;
  }
  visitNode(node: TreeNodeInterface, hashMap: object, array: TreeNodeInterface[]): void {
    if (!hashMap[ node.ID ]) {
      hashMap[ node.ID ] = true;
      array.push(node);
    }
  }
  */
}
