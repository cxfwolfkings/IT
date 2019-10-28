/**
 * 内容标签模型类
 * add by Colin
 */
export class TagModel {
    Id: number; // 主键
    Name: string; // 名称
    CategoryId: number; // 标签所属内容类型
    CategoryName: string; // 标签所属内容类型名称
    Creator: string; // 创建者
    CreateTime: string; // 创建时间
}
