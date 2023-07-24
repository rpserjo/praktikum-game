/* server types */

export type TTopicData = {
    id: number;
    topic: string;
    message: string;
    author: string;
    authorAvatar: string | null;
    createdAt: string;
    commentsCount: number;
    lastMessageDate: string;
};

export type TTopicReply = {
    id: number;
    commentId: number;
    author: string;
    authorAvatar: string | null;
    createdDate: string;
    text: string;
};

export type TCommentData = {
    id: number;
    topicId: number;
    message: string;
    author: string;
    authorAvatar: string | null;
    createdAt: string;
    replies: TTopicReply[] | null;
};

export type TTopicListServerData = {
    topics: TTopicData[];
    lastPage: number;
};

export type TCommentListServerData = {
    Comments: TCommentData[];
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
    replies: TTopicReply[] | null;
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

export type TTopicWithCommentsData = {
    topic: TTopic;
    comments: TTopicComment[];
    lastPage: number;
};

export type TTopicListData = {
    topics: TTopic[];
    lastPage: number;
};

export type TCommentListData = {
    comments: TTopicComment[];
    lastPage: number;
};
