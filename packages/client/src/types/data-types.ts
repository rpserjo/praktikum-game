export type TLeaderBoardData = {
    name: string;
    login: string;
    winsCount: number;
    lostCount: number;
    score: number;
};

export type TForumData = {
    msgId: number;
    topicId: number;
    topic: string;
    message: string;
    author: string;
    createDate: string;
    emojis: {
        like: number;
        hmm: number;
        heart: number;
        ghost: number;
        fire: number;
        the_rooms: number;
    };
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
