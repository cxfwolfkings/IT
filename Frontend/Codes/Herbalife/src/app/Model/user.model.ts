/**
 * 用户模型
 * add by Colin
 */

export class GroupUserModel {
    Id: number;
    AppUserId: number;
    ChrisID: string;
    Division: string;
    Department: string;
    MobilePhone: string;
    Email: string;
    IsDisabled: boolean;
    AccountIsDisabled: boolean;
    CreationTime: string;
    Name: string;
    IsDisabledDisplay: string;
    AccountIsDisabledDisplay: string;
    UserID: number;
}

export class VUserModel {
    Id: number;
    AD: string;
    Email: string;
    CName: string;
    EName: string;
    Name: string;
    ChrisID: string;
    Department: string;
    RoleId: number;
    RoleName: string;
    IsDisabled: boolean;
    IsDeptManager: boolean;
    LanguageId: number;
}
