import leaderBoardData from './data/mock-leaderbord-data.json';
import forumData from './data/mock-forum-data.json';
import { TLeaderBoardData, TForumData } from '@/types/data-types';

export default class MockServer {
    protected leaderBoardData: TLeaderBoardData[];

    protected forumData: TForumData[];

    constructor() {
        this.leaderBoardData = leaderBoardData;
        this.forumData = forumData;
    }

    public getLeaderBoardData() {
        return this.leaderBoardData;
    }

    public getTopicList() {
        const topicList = [
            ...this.forumData
                .reduce((groupMap, object) => {
                    const key = object.topicId;

                    const item = groupMap.get(key) || {
                        topic: object.topic,
                        author: object.author,
                        msgQty: 0,
                        createDate: object.createDate,
                        dateLastMessage: object.createDate,
                        topicId: object.topicId,
                    };

                    item.msgQty += 1;

                    if (Date.parse(item.dateLstMsg) < Date.parse(object.createDate)) {
                        item.dateLstMsg = object.createDate;
                    }

                    return groupMap.set(key, item);
                }, new Map())
                .values(),
        ];

        return topicList;
    }

    public getTopic(id: number) {
        return this.forumData.filter(({ topicId }) => topicId === id);
    }
}
