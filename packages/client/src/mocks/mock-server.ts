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
                .reduce((r, o) => {
                    const key = o.topicId;

                    const item = r.get(key) || {
                        topic: o.topic,
                        author: o.author,
                        msgQty: 0,
                        createDate: o.createDate,
                        dateLstMsg: o.createDate,
                        topicId: o.topicId,
                    };

                    item.msgQty += 1;

                    if (Date.parse(item.dateLstMsg) < Date.parse(o.createDate)) {
                        item.dateLstMsg = o.createDate;
                    }

                    return r.set(key, item);
                }, new Map())
                .values(),
        ];

        return topicList;
    }

    public getTopic(id: number) {
        const topicData = this.forumData.filter(val => val.topicId === id);

        return topicData;
    }
}
