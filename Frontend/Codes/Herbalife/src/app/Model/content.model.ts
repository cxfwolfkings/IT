import { CategoryModel } from './category.model';
import { TagModel } from './tag.model';

/**
 * 内容模型类
 * add by Colin
 */
export class ContentItemModel {
    Id: number; // 主键
    CnContentTitle: string; // 中文名称
    EnContentTitle: string; // 英文名称
    ContentStatus: number; // 状态
    StatusName: string; // 状态
    CategoryID: number; // 内容分类ID
    CategoryName: string; // 分类名称
    CreationTime: string; // 更新时间
    CreatorName: string; // 更新人
    TopOrder: number; // 置顶排序
}

export class ContentModel {
    contentId: number; // 主键
    CN: ContentLanguageViewModel; // 中文
    EN: ContentLanguageViewModel; // 英文
    isPraise: boolean; // 是否可赞
    isEnableComment: boolean; // 是否可评论
    contentCoverImageId: number; // 内容封面
    messageCoverImageId: number; // 消息封面
    isSendMessage: boolean; // 是否直接发送信息
    contentCategory: CategoryModel;
    status: number;
    tag: TagModel[];
    imageUrl: string;
    groupIds: number[];
    userIds: number[];
    groups: object[];
    users: object[];
}
export class ContentLanguageViewModel {
    text: string; // 内容
    title: string; // 名称
    summary: string; // 摘要
}
/**
 * 内容状态
 */
export class StatusModel {
    ID: number;
    StatusNameCn: string;
}
