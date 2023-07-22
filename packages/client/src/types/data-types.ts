export type TLeaderBoardData = {
    name: string;
    login: string;
    winsCount: number;
    lostCount: number;
    score: number;
};

/* forum */

/* server types */

export type TTopicData = {
    id: number;
    topic: string;
    message: string;
    author: string;
    createdAt: string;
    commentsCount: number;
    lastMessageDate: string;
};

export type TCommentData = {
    id: number;
    message: string;
    author: string;
    createdAt: string;
};

/* client types */

export type TTopicInfo = {
    id: number;
    title: string;
    message: string;
    author: string;
    createdDate: string;
    commentsCount: number;
    lastCommentDate: string;
};

export type TTopicMessage = {
    id: number;
    author: string;
    createdDate: string;
    text: string;
};

export type TTopicMessageForSave = {
    id: number;
    text: string;
};

export type TTopicForSave = {
    title: string;
    text: string;
};

export type TTopicWithCommentsData = {
    topic: TTopicInfo;
    comments: TTopicMessage[];
    lastPage: number;
};

export type TTopicListData = {
    topics: TTopicInfo[];
    lastPage: number;
};

export default TLeaderBoardData;
