export type TLeaderBoardData = {
    name: string;
    login: string;
    winsCount: number;
    lostCount: number;
    score: number;
};

export type TEmojis = {
    like: { amount: number; users: Array<string> };
    hmm: { amount: number; users: Array<string> };
    heart: { amount: number; users: Array<string> };
    ghost: { amount: number; users: Array<string> };
    fire: { amount: number; users: Array<string> };
    the_rooms: { amount: number; users: Array<string> };
};

export type TForumData = {
    msgId: number;
    topicId: number;
    topic: string;
    message: string;
    author: string;
    createDate: string;
    emojis: TEmojis;
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

export default TLeaderBoardData;
