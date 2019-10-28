export class MenuModel{
    ID:number;
    PermissonString:string;
    SortOf:number;
    SourceType:number;
    Url :string;
    Remark :string;
    ParentId:number;
    Children : MenuModel[];
    ObjectName:string;
  }