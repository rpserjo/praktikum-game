/* server types */

export type TTopicServerData = {
    id: number;
    topic: string;
    message: string;
    author: string;
    authorAvatar: string | null;
    createdAt: string;
    commentsCount: number;
    lastMessageDate: string;
};

// for both server and client reply object models
export type TTopicReply = {
    replyId: number;
    id: number;
    author: string;
    authorAvatar: string | null;
    replyCreatedAt: string;
    message: string;
};

export type TCommentServerData = {
    id: number;
    topicId: number;
    message: string;
    author: string;
    authorAvatar: string | null;
    commentCreatedAt: string;
    replies: TTopicReply[];
};

export type TTopicListServerData = {
    topics: TTopicServerData[];
    LastPage: number;
};

export type TCommentListServerData = {
    Comments: TCommentServerData[];
    LastPage: number;
};

/* client types */

export type TTopic = {
    id: number;
    title: string;
    message: string;
    author: string;
    authorAvatar: string | null;
    createdDate: string;
    commentsCount: number;
    lastCommentDate: string;
};

export type TTopicComment = {
    id: number;
    topicId: number;
    author: string;
    authorAvatar: string | null;
    createdDate: string;
    text: string;
    replies: TTopicReply[];
};

// for saving both comments and replies
export type TTopicMessageForSave = {
    parentId: number;
    text: string;
};

export type TTopicForSave = {
    title: string;
    text: string;
};

export type TTopicListData = {
    topics: TTopic[];
    lastPage: number;
};

export type TCommentListData = {
    comments: TTopicComment[];
    lastPage: number;
};
