import { TTopicData } from '@/types/data-types';

export type TTopicServerData = {
    items: TTopicData[];
    lastPage: number;
};

export type TForumDataOld = {
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
