export type TForumData = {
    msgId: number;
    topicId: number;
    topic: string;
    message: string;
    author: string;
    createDate: string;
};

export type TTopicList = {
    topicId: number;
    topic: string;
    message: string;
    author: string;
    createDate: string;
    dateLastMessage: string;
    messageQty: number;
};

export type TTopicServerData = {
    items: TTopicList[];
    lastPage: number;
};
