/**
 * 评论相关模型
 * add by Colin 2018-10-16
 */
export class CommentViewModel {
    CommentId: number; // 主键
    ContentId: number; // 内容Id
    Title: string; // 名称
    Comment: string; // 评论
    Commentator: string; // 评论人
    Time: string; // 评论日期
    IsApproved: number; // 审核状态 1:待审核 2:通过 3:屏蔽
    isAdminReply: number; // 管理员是否回复 1：已回复 0：没有
    AdminReplyContent: string; // 管理员回复内容
    CategoryName: string; // 内容分类
}
