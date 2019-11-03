import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css']
})

export class MiddleComponent implements OnInit {

  /*
  CurrentMenuList = null;
  currentParentID = 0;
  pastURL = '';
  */
  curUrl = '';
  nodes = [];
  Remark = '';
  pastURL = '';

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    // this.CurrentMenuList = null;
  }

  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ngOnInit() {
    const base = this;
    let $lastMenu = null;
    setInterval(() => {
      base.curUrl = location.href;
      let isSelected = false;
      $('.ant-menu li').each(function (index, item) {
        const menuUrl = $(item).data('url');
        if (base.selectMenu(menuUrl + '')) {
          $(item).addClass('ant-menu-item-selected');
          $lastMenu = $(item);
          isSelected = true;
          // if(base.pastURL.indexOf(menuUrl)<0 )
          // {
          //   console.info(menuUrl);
          //   console.info(base.pastURL);
          //   base.pastURL=base.curUrl;
          //   base.router.navigateByUrl('').then(() => {
          //     base.router.navigate([menuUrl]);
          //   });
          // }
        } else {
          $(item).removeClass('ant-menu-item-selected');
        }
      });
      if (!isSelected) {
        if ($lastMenu) {
          $lastMenu.addClass('ant-menu-item-selected');
        }
      }
      /*
      // 仅在路径变更时执行一次
      if (base.pastURL !== location.href) {
        const menuString = sessionStorage.getItem('CurrentMenuList');
        if (menuString) {
          base.CurrentMenuList = JSON.parse(sessionStorage.getItem('CurrentMenuList'));
          // 设置父菜单为当前选中项父菜单
          // 展开当前父菜单
          for (let index = 0; index < base.CurrentMenuList.length; index++) {
            if (base.curUrl.split('#')[1].indexOf(base.CurrentMenuList[index].Url) >= 0) {
                base.currentParentID = base.CurrentMenuList[index].ParentId;
            }
          }
          base.GetMainMenus();
        }
        base.pastURL = location.href;
      }
      */
    }, 60);
    let replaceTimes = 0;
    const intervalId = setInterval(() => {
      /*
      const curUser = sessionStorage.getItem('AppAccountInfo');
      if (curUser && curUser === 'invalid user') {
        clearInterval(intervalId);
        base.CurrentMenuList = [];
        return;
      }
      */
      const menuString = sessionStorage.getItem('CurrentMenuList');
      if (menuString) {
        if (base.nodes && base.nodes.length) {
          const maxTimes = base.nodes.filter(_ => _.ParentId).length;
          if (replaceTimes < maxTimes) {
            $('.ant-menu li span').each(function (index, item) {
              let label = $(item).html();
              if (label.indexOf('\t\t\t\t') >= 0) {
                $(item).html('');
                label = label.replace(/\t\t\t\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                $(item).append(label);
                replaceTimes++;
              }
            });
          } else {
            clearInterval(intervalId);
            console.log('init menu finish');
            $('.ant-menu li').hide();
            $('.parent0').show();
            this.getTop(this.curUrl);
          }
        } else {
          base.nodes = JSON.parse(sessionStorage.getItem('CurrentMenuList'));
        }
        console.log(1)
        if (base.nodes.filter(_ => _.Url === base.router.url).length) {
          if (base.nodes.filter(_ => _.Url !== base.router.url)[0].SourceType === 1) {
            base.Remark = base.nodes.filter(_ => _.Url === base.router.url)[0].Remark;
          }
        }
      }
    }, 60);
  }

  public getTop(curUrl?, node?) {
    const base = this;
    let parentId = -1;
    if (curUrl) {
      base.nodes.forEach(_ => {
        if (curUrl.indexOf(_.Url) >= 0) {
          $('.parent' + _.ParentId).show();
          parentId = _.parentId;
          return false;
        }
      });
    }
    if (node) {
      $('.parent' + node.ParentId).show();
      parentId = node.ParentId;
    }
    const parentNode = base.nodes.find(n => n.ID === parentId);
    if (parentNode) {
      this.getTop(null, parentNode);
    }
  }

  public selectMenu(menuUrl) {
    if (menuUrl && menuUrl.indexOf('/') === 0) {
      return this.curUrl.indexOf(menuUrl) >= 0;
    }
  }

  // 获取主菜单
  /*
  public GetMainMenus() {
    const MainArr = [];
    if (this.CurrentMenuList && this.CurrentMenuList.length) {
      if (this.currentParentID === 0) {
        this.currentParentID = this.CurrentMenuList.filter(function(m) { return m.ParentId === 0; })[0].ID;
      }
      for (let index = 0; index < this.CurrentMenuList.length; index++) {
        if (this.CurrentMenuList[index].ParentId === 0) {
          if (this.CurrentMenuList[index].ID === this.currentParentID) {
            this.CurrentMenuList[index].IsOpen = true;
          } else {
            this.CurrentMenuList[index].IsOpen = false;
          }
          MainArr.push(this.CurrentMenuList[index]);
        }
      }
    }
    return MainArr;
  }
  */

  // 获取子菜单
  /*
  public GetChildMenus(pid) {
    const ChildArr = [];
    for (let index = 0; index < this.CurrentMenuList.length; index++) {
      if (this.CurrentMenuList[index].ParentId === pid) {
        ChildArr.push(this.CurrentMenuList[index]);
      }
    }
    return ChildArr;
  }
  */

  /**
   * 菜单跳转
   * @param url
   */
  public GoRouter(data) {
    if (data.SourceType !== 1) {
      this.Remark = data.Remark;
    }

    if ($('.parent' + data.ID).is(':hidden')) {
      this.showOrHideElem(data.ID, true);
    } else {
      this.showOrHideElem(data.ID, false);
    }
    if (data.Url && data.Url.indexOf('/') >= 0) {
      this.router.navigateByUrl('').then(() => {
        this.router.navigate([data.Url]);
      });
      // 切换路由置顶
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  public showOrHideElem(id: number, isShow) {
    const base = this;
    if (isShow) {
      $('.parent' + id).show();
      $('#menuItem' + id).find('.spanIcon').text('∧');
    } else {
      $('.parent' + id).hide();
      $('#menuItem' + id).find('.spanIcon').text('∨');
    }
    $('.parent' + id).each(function (index, item) {
      base.showOrHideElem($(item).attr('id').split('menuItem')[1], isShow);
    });
  }

  /*
  openHandler(ID: number) {
    this.currentParentID = ID;
    this.GetMainMenus();
  }
  */
}
