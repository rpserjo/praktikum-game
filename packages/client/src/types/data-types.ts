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
};

export default TLeaderBoardData;
