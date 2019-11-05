import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";
import pnp, { Web, List, ListEnsureResult, ItemAddResult, FieldAddResult } from "sp-pnp-js";

import styles from "./TaskListWebPart.module.scss";
import * as strings from "TaskListWebPartStrings";
import MockHttpClient from "./MockHttpClient";
import {
  SPHttpClient,
  SPHttpClientResponse
} from "@microsoft/sp-http";
import {
  Environment,
  EnvironmentType
} from "@microsoft/sp-core-library";

import * as $ from "jquery";
import { SiteGroup, SiteGroups } from "../../../node_modules/sp-pnp-js/lib/sharepoint/sitegroups";

export interface ITaskListWebPartProps {
  description: string;
  listName: string;
}

export interface ISPItems {
  value: ISPItem[];
}

export interface IWebLists {
  value: Array<object>;
}

export interface IWebList {
  Url: string;
}

export interface ISPList {
  Id: string;
}

export interface ISPItem {
  Id: string;
  Title: string;
  Created: string;
  DueDate: string;
  Status: string;
  AuthorId: string;
  AssignedToId: object;
  ContentTypeId: string;
}

export interface IUser {
  loginName: string;
  displayName: string;
  email: string;
}

export interface ISiteUser {
  Id: number;
  LoginName: string;
  Title: string;
  Email: string;
}

export interface ISiteUsers {
  value: ISiteUser[];
}

export interface ISiteGroup {
  Id: number;
  Title: string;
}

export interface ISiteGroups {
  value: ISiteGroup[];
}

export interface IRelatedItems {
  ListId: string;
}

export interface ITaskItem {
  siteName: string;
  targetUrl: string;
  title: string;
  createdDate: Date;
  dueDate: Date;
  status: string;
  createUserName: string;
  assignName: string;
}

export default class TaskListWebPart extends BaseClientSideWebPart<ITaskListWebPartProps> {

  loginUser: IUser;
  taskItems: ITaskItem[];
  startIndex: number = 0;
  endIndex: number = 0;

  public render(): void {
    this.loginUser = {
      loginName: this.context.pageContext.user.loginName,
      displayName: this.context.pageContext.user.displayName,
      email: this.context.pageContext.user.email
    };
    this.domElement.innerHTML = `
    <div class="${ styles.taskList}">
      <div class="${ styles.container}">
        <table id="spListContainer">
          <thead>
            <th>项目名称</th>
            <th>任务名称</th>
            <th>创建时间</th>
            <th>截止时间</th>
            <th>任务状态</th>
            <th>创建者</th>
            <th>分配任务</th>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>`;
    this._renderListAsync();
    const base:TaskListWebPart  = this;
    let repeatNum:number = 0;
    const intervald:number = setInterval(function(): void {
      repeatNum++;
      if (base.startIndex === base.endIndex && base.startIndex !== 0) {
        clearInterval(intervald);
        $("#spListContainer tbody").empty();
        const taskItems:ITaskItem[] = base.taskItems.sort(function(a:ITaskItem, b:ITaskItem): number {
          if ((a.status === "未启动" || a.status === "Not Started") && (b.status !== "未启动" && b.status !== "Not Started")) {
            return -1;
          } else if ((a.status !== "未启动" && a.status !== "Not Started") && (b.status === "未启动" || b.status === "Not Started")) {
            return 1;
          } else {
            return a.createdDate.getTime() - b.createdDate.getTime();
          }
        });
        let html: string = "";
        $.each(taskItems, function(index:number, item: ITaskItem): void {
          html += `
            <tr>
              <td>${item.siteName}</td>
              <td>
                <a target="_blank"
                  href="${item.targetUrl}">
                  <span style="white-space:nowrap">${item.title}</span>
                </a>
              </td>
              <td>${base.DateFormat(item.createdDate)}</td>
              <td>${base.DateFormat(item.dueDate)}</td>
              <td>${item.status}</td>
              <td>${item.createUserName}</td>
              <td>${item.assignName}</td>
            </tr>
            `;
        });
        $("#spListContainer tbody").append(html);
      } else if(base.startIndex === 0 && repeatNum === 999999) {
        clearInterval(intervald);
      }
    }, 900);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: "描述"
                }),
                PropertyPaneTextField("listName", {
                  label: "列表名称"
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private DateFormat(date:Date):string {
    let dateFormat:string = "";
    if (date) {
      const month:string = date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1+"";
      const day:string = date.getDate()<10?"0"+date.getDate():date.getDate()+"";
      const hours:string = date.getHours()<10?"0"+date.getHours():date.getHours()+"";
      const minutes:string = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()+"";
      const seconds:string = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()+"";
      dateFormat = date.getFullYear() + "-" + month + "-" + day + " "
        + hours + ":" + minutes + ":" + seconds;
    }
    return dateFormat;
  }

  private _getMockListData(): Promise<ISPItems> {
    return MockHttpClient.get()
      .then((data: ISPItem[]) => {
        var listData: ISPItems = { value: data };
        return listData;
      }) as Promise<ISPItems>;
  }

  private _getListData(baseUrl: string): Promise<ISPItems> {
    const siteName: string = `${baseUrl}/_api/lists/getbytitle('${this.properties.listName}')/items`;
    return this.context.spHttpClient.get(siteName, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getListDataByPnp(baseUrl: string): Promise<ISPItem[]> {
    const web:Web = new Web(baseUrl);
    return web.lists.getByTitle(this.properties.listName).items.get();
  }

  private _getListByPnp(baseUrl: string): Promise<ISPList> {
    const web:Web = new Web(baseUrl);
    return web.lists.getByTitle(this.properties.listName).get();
  }

  private _getWebList(): Promise<IWebLists> {
    const siteName: string = `/sites/pwa/_api/site/rootweb/webs`;
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl
       + siteName, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
         return response.json();
    });
  }

  private _getWebListByPnp(): Promise<IWebList[]> {
    let siteName: string = this.context.pageContext.web.absoluteUrl;
    siteName = siteName.substring(0, siteName.indexOf("/sites"));
    siteName += `/sites/pwa/`;
    const web:Web = new Web(siteName);
    return web.webs.get();
  }

  private _getSiteUser(callUri: string): Promise<ISiteUsers> {
    return this.context.spHttpClient.get(callUri, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  // 获取当前用户所在组信息
  private _getUserGroup(callUri: string): Promise<ISiteGroups> {
   return this.context.spHttpClient.get(callUri, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
   }

  private _getSiteUserByPnp(): Promise<ISiteUser[]> {
    return pnp.sp.web.siteUsers.get();
  }

  private _getSiteGroup(callUri: string): Promise<ISiteGroups> {
    return this.context.spHttpClient.get(callUri, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getSiteGroupByPnp(): Promise<ISiteGroup[]> {
    return pnp.sp.web.siteGroups.get();
  }

  private _renderListAsync(): void {
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    } else if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      this._getWebListByPnp().then(w => {
        this.startIndex = 0;
        this.endIndex = 0;
        this.taskItems = [];
        for (let i: number = 0; i < w.length; i++) {
          this._getListByPnp(w[i].Url).then((list)=> {
            if(list) {
              this._getListDataByPnp(w[i].Url).then((response) => {
                if (response && response.length) {
                  this.startIndex++;
                  this._renderList(response, w[i].Url, list.Id);
                }
              });
            }
          });
        }
      });
    }
  }

  private convertToNumber(obj: object): Array<Number> {
    let assignIds:number[] = [];
    if(obj && Array.isArray(obj)) {
      assignIds = obj;
    } else {
      assignIds = [Number(obj)];
    }
    return assignIds;
  }

  private enumerateGroup(siteUsers: ISiteUser[], siteGroups:ISiteGroup[], curUserId:number
    , curUserGroupIds: number[], callUri: string, items: ISPItem[], listId: string): void {
    const siteName: string = callUri.substr(callUri.lastIndexOf("/") + 1);
    items = items.filter(_=> {
      const assignIds: Array<Number> = this.convertToNumber(_.AssignedToId);
      return curUserGroupIds.some(g=>$.inArray(g, assignIds)>-1) || $.inArray(curUserId, assignIds)>-1;
    });
    items.forEach((item: ISPItem) => {
      const createUserName:string = (siteUsers.filter(_=>_.Id + "" === item.AuthorId + ""))[0].Title;
      let assignName:string = (siteGroups.filter(_=> {
        const assignIds: Array<Number> = this.convertToNumber(item.AssignedToId);
        return $.inArray(_.Id, assignIds)>-1;
      })).map(_=>_.Title).join(",");
      let createdDate: Date = null;
      let dueDate: Date = null;
      if (item.Created) {
        const createdDateStr:string = item.Created.replace("T", " ").replace("Z", "");
        createdDate = new Date(createdDateStr);
      }
      if (item.DueDate) {
        const dueDateStr:string = item.DueDate.replace("T", " ").replace("Z", "");
        dueDate = new Date(dueDateStr);
      }
      const taskItem: ITaskItem = {
        siteName: siteName,
        // targetUrl: `${callUri}/_layouts/15/listform.aspx?PageType=4&ListId=${listId}&ID=${item.Id}&ContentTypeID=${item.ContentTypeId}`,
        targetUrl: `${callUri}/Lists/${this.properties.listName}/EditForm.aspx?ID=${item.Id}`,
        title: item.Title === null ? "" : item.Title,
        createdDate: createdDate,
        dueDate: dueDate,
        status: item.Status === null ? "" : item.Status,
        createUserName: createUserName,
        assignName: assignName || this.loginUser.displayName
      };
      if(this.taskItems.every(_=>_.targetUrl !== taskItem.targetUrl)) {
        this.taskItems.push(taskItem);
      }
    });
    this.endIndex++;
  }

  private enumerateUserGroup(siteUsers: ISiteUser[], curUserId:number, userGroups:ISiteGroup[], callUri: string
    , items: ISPItem[], listId: string): void {
    const curUserGroupIds: number[] = userGroups.map(_=>_.Id);
    const callGroupUrl: string = `${callUri}/_api/web/sitegroups`;
    this._getSiteGroup(callGroupUrl).then(siteGroups => {
      this.enumerateGroup(siteUsers, siteGroups.value, curUserId, curUserGroupIds, callUri, items, listId);
    });
  }

  private enumerateUser(siteUsers: ISiteUser[], callUri: string, items: ISPItem[], listId: string): void {
    const curUserId:number = (siteUsers.filter(_=>_.Title===this.loginUser.displayName))[0].Id;
    const callGroupsByUserId: string = `${callUri}/_api/web/GetUserById(${curUserId})/Groups`;
    this._getSiteGroup(callGroupsByUserId).then(userGroups => {
      this.enumerateUserGroup(siteUsers, curUserId, userGroups.value, callUri, items, listId);
    });
  }

  private _renderList(items: ISPItem[], callUri: string = "", listId:string = ""): void {
    const callUserUrl: string = `${callUri}/_api/web/siteusers`;
    this._getSiteUser(callUserUrl).then(siteUsers => {
      this.enumerateUser(siteUsers.value, callUri, items, listId);
    });
  }
}
