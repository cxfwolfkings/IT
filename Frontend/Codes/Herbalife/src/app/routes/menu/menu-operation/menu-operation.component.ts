import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { MenuModel } from '../menu.model';
import { MenuService } from '../menu.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PARAMETERS } from '@angular/core/src/util/decorators';

declare var $: any;

@Component({
  selector: 'app-menu-operation',
  templateUrl: './menu-operation.component.html',
  styleUrls: ['./menu-operation.component.css']
})

export class MenuOperationComponent implements OnInit {
  validateForm: FormGroup;
  validateFirstForm: FormGroup;
  isShowUrl = false;
  isRepeatName = false;
  optionList = [
    { label: '---请选择---', value: 0 }
  ];
  selectedValue = { label: '---请选择---', value: 0 };
  selectedSourceValue = '1';
  GetParentId = 1;

  menuModel = new MenuModel();
  selectParentError = '';

  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.value === o2.value : o1 === o2;

  submitForm(): void {
    this.menuService.checkRepeatMenuName(this.menuModel.ID, this.menuModel.Remark, this.selectedSourceValue).subscribe(m => {
      let isSubmit = true;
      this.isRepeatName = m;
      if (this.selectedSourceValue === '1') {
        // 当选择模块时候去掉资源类型验证
        // this.validateForm.controls['ParentId'].clearValidators();
      } else {
        // 当选择菜单时候显示资源类型验证
        // this.validateForm.controls['ParentId'].setValidators(Validators.required);
        if (this.selectedValue.value === 0) {
          this.selectParentError = '请选择父目录！';
          // this.message.error('请选择父目录', { nzDuration: 5000 });
          isSubmit = false;
        } else {
          this.selectParentError = '';
        }
      }
      for (const i in this.validateForm.controls) {
        if (true) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
          if (isSubmit) {
            isSubmit = !this.validateForm.controls[i].invalid;
          }
        }
      }
      this.isRepeatName = false;
      if (isSubmit) {
        for (const key in this.menuModel) {
          if (!this.menuModel[key]) {
            this.menuModel[key] = '';
          }
        }
        this.menuModel.SourceType = +this.selectedSourceValue;
        if (this.selectedSourceValue === '1') {
          this.menuModel.ParentId = 0;
        } else {
          this.menuModel.ParentId = this.selectedValue.value;
        }
        if (this.menuModel.ID === 0) {
          this.menuService.addMenu(this.menuModel).subscribe(r => {
            if (r) {
              this.message.success('添加成功！', { nzDuration: 5000 });
            }
            this.router.navigate(['/menu/list']);
          });
        } else {
          this.menuService.updateMenu(this.menuModel).subscribe(r => {
            if (r) {
              this.message.success('编辑成功！', { nzDuration: 5000 });
            }
            this.router.navigate(['/menu/list']);
          });
        }
      }
    });
  }
  /*
  submitFirstForm(): void {
    this.menuService.checkRepeatFirstMenuName(this.menuModel.ID, this.menuModel.Remark).subscribe(m => {
      //debugger;
      let isSubmit = true;
      this.isRepeatName = m;
      for (const i in this.validateFirstForm.controls) {
        this.validateFirstForm.controls[i].markAsDirty();
        this.validateFirstForm.controls[i].updateValueAndValidity();
        if (isSubmit) {
          isSubmit = !this.validateFirstForm.controls[i].invalid;
        }
      }
      this.isRepeatName = false;
      if (isSubmit) {
        // this.menuModel.ParentId = this.selectedValue.value;
        // this.menuModel.SourceType = +this.selectedSourceValue;

        if (this.menuModel.ID === 0) this.menuService.addMenu(this.menuModel).subscribe(m => {
          if (m) this.message.success("添加成功！", { nzDuration: 5000 });
          this.router.navigate(['/menu/list']);
        });
        else this.menuService.updateFirstMenu(this.menuModel).subscribe(m => {
          if (m) this.message.success("编辑成功！", { nzDuration: 5000 });
          this.router.navigate(['/menu/list']);
        });
      };
    });
  }
  */
  /**
   * 加载父目录
   */
  loadParentNode(): void {
    this.menuService.getMenuList().do(() => { }).subscribe(data => {
      data.items.map(m => {
        // if (m.ParentId === 0) {
        this.optionList.push({ label: m.Remark, value: m.ID });
        // }
      });
      let replaceTimes = 0;
      const maxTimes = data.items.filter(_ => _.ParentId).length;
      const replaceId = setInterval(function() {
        if (replaceTimes < maxTimes) {
          $('.ant-select-dropdown-menu-item').each(function(index, item) {
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
          console.log('load parent dir finish');
        }
      }, 60);
    });
  }
  /*
  changeStatus(selectedOption: { label: string, value: number }): void {
    if (selectedOption.value === 0) this.isShowUrl = false;
    else this.isShowUrl = true;
    if (this.isShowUrl) this.validateForm.addControl("Url", new FormControl(this.menuModel.Url, [Validators.required]));
    else this.validateForm.removeControl("Url");
  }
  */
  // 得到二级菜单信息
  getMenuById(): void {
    // this.menuModel= new MenuModel();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.menuService.getMenuById(id).do(() => { }).subscribe(m => {
        if (m) {
          this.menuModel = m;
          this.selectedSourceValue = String(m.SourceType);
          this.selectedValue = { label: m.Remark, value: m.ParentId };
        }
      });
    }
  }

  setControlValid() {
    if (this.selectedSourceValue === '2') {
      /*
      this.validateForm.setControl('Url', new FormControl(this.menuModel.Url, [Validators.required]));
      this.validateForm.setControl('PermissonString', new FormControl(this.menuModel.PermissonString,
        [Validators.required, Validators.maxLength(50)]));
      */
     this.validateForm.controls['Url'].setValidators(Validators.required);
     this.validateForm.controls['PermissonString'].setValidators([Validators.required, Validators.maxLength(50)]);
    } else {
      /*
      this.validateForm.setControl('Url', new FormControl(this.menuModel.Url, []));
      this.validateForm.setControl('PermissonString', new FormControl(this.menuModel.PermissonString, []));
      */
      this.validateForm.controls['Url'].clearValidators();
      this.validateForm.controls['PermissonString'].clearValidators();
    }
  }

   // 得到一级菜单信息
   getMenuFirstById(): void {
    // this.menuModel= new MenuModel();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.menuService.getFirstMenuById(id).do(() => { }).subscribe(m => {
        if (m) {
          this.menuModel = m;
          this.selectedSourceValue = String(m.SourceType);
          this.selectedValue = { label: m.Remark, value: m.ParentId };
          if (m.ParentId !== 0) {
            this.isShowUrl = true;
          }
        }
      });
    }
  }


  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService) {
  }

  checkRepeatMenuName = (control: FormControl): { [s: string]: boolean } => {
    if (this.isRepeatName) {
      return { checkRepeatName: true, error: true };
    } else {
      return null;
    }
  }

  checkRepeatFirstMenuName = (control: FormControl): { [s: string]: boolean } => {
    if (this.isRepeatName) {
      return { checkRepeatName: true, error: true };
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.menuModel.ID = 0;
    this.menuModel.ParentId = 0;
    this.route.queryParams.subscribe(params => {
      this.GetParentId = params['ParentId'];
    });
    // if(this.GetParentId==null){
    this.getMenuById();
    // }else{
    //   this.getMenuFirstById();
    // }
    this.loadParentNode();
    this.validateForm = this.fb.group({
      Name: [this.menuModel.Remark, [Validators.required, this.checkRepeatMenuName]],
      ParentId: [this.menuModel.ParentId, []],
      PermissonString: [this.menuModel.PermissonString, []],
      SortOf: [this.menuModel.SortOf, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      SourceType: [this.menuModel.SourceType, [Validators.required]],
      Icon: [null],
      Note: [null],
      Url: [this.menuModel.Url, []]
    });
    this.validateFirstForm = this.fb.group({
      Name: [this.menuModel.Remark, [Validators.required, this.checkRepeatMenuName]],
      SortOf: [this.menuModel.SortOf, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
    // 置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  // 转树数据
  convertToTreeNode(): void {
    this.menuService.getMenuList().do(() => { }).subscribe(m => {
      m.forEach(n => {
        const treeNode = new NzTreeNode({ key: n.ID.toString(), title: n.Remark });
        this.loadTreeNode(treeNode, n);
        // this.nodes.push(treeNode);
      });
    });
  }

  // 生成下拉菜单树的数据格式
  loadTreeNode(treeNode: NzTreeNode, menuData: MenuModel): void {
    if (menuData.Children && menuData.Children.length > 0) {
      const subNodes: NzTreeNode[] = [];
      menuData.Children.forEach(m => {
        const subTreeNode = new NzTreeNode({ key: m.ID.toString(), title: m.Remark });
        this.loadTreeNode(subTreeNode, m);
        subNodes.push(subTreeNode);
      });
      treeNode.addChildren(subNodes);
    }
  }
}
