import { TEmojisType } from '@/types/data-types';

export type TForumData = {
    msgId: number;
    topicId: number;
    topic: string;
    message: string;
    author: string;
    createDate: string;
    emojis: TEmojisType;
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
