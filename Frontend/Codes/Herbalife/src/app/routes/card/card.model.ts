import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzMessageService } from 'ng-zorro-antd';
import { TreeNodeModel } from '../../../app/Model/tree.model';

//已创建消息列表实体
  export class SearchListModel{
    firstR:string;
    secondR:string;
    rid:string;
    r:string;
    startTime:string;
    endTime:string;
    state:string;
    key:string;
  }


export class CardConfigModel{
    ID:number;
    ConfigItem:string;
    ConfigValue:string;
    ConfigType:number;
}

//打卡记录-区域选择-返回列表
export class RegionFmt{
    ID:string;
    Name:string;
}

export class CardRecordList{
    Date:string;
    Department:string;
    WeChatOpenId:string;
    Name:string;
    Region:string;
    Type:string;
    Time:string;
    State:string;
}


export class CardRecordDetail{
    Date:string;
    Photo:string;
    Name:string;
    EnglishName:string;
    Department:string;
    Type:string;
    Time:string;
    Address:string;
    Remark:string;
}

export class NoCardUser{
    Id:number;
    Photo:string;
    Name:string;
    EnglishName:string;
    Region:string;
    Department:string;
    Position:string;
    Email:string;
    Phone:string;
    Phone2:string;
    Telephone:string;
    State:string;
    CardRules:string;
}

export class JsonResult{
    success:boolean;
    error:string;
    result:string;
    StatusCode:number
}

export class CardDetail{
    Id:number;
    Title:string;
    WorkStart:string;
    //WorkEnd:string;
    RestStart:string;
    //RestEnd:string;
    //UserListJson:string;
    Week:string;
    WorkRemind:number;
    RestRemind:number;
    Address:string;
    Longitude:number;
    Latitude:number;
    WorkAllowTime:number;
    RestAllowTime:number;
    AllowAddress:number;
}

export class InitSetCardUser{
    RegionNodes:TreeNodeModel[];
    checkedDepartKeys:string[];
    GroupList:CardUserDto[];
    checkedGroupKeys:string[];
    checkedUserKeys:string[];
    RegionUserList:CardUserDto[];
    SelectedCardUsersList:CardUserDto[];
}

export class CardUserDto{
    ID:number;
    Photo:string;
    Name:string;
    EnglishName:string;
    WeChatOpenId:string;
    RegionID:number;
    Department:string;
    IsChecked:boolean;
}

export class SetCardUserModel{
    cardId:number;
    selectedRegionIds:number[];
    selectedGroupIds:number[];
    selectedUserIds:number[];
}