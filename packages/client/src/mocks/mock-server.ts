import leaderBoardData from './data/mock-leaderbord-data.json';
import forumData from './data/mock-forum-data.json';
import { TLeaderBoardData, TEmojisType } from '@/types/data-types';

import { TForumData, TTopicList, TTopicServerData } from './mockDataTypes';

class MockServer {
    protected leaderBoardData: TLeaderBoardData[];

    protected forumData: TForumData[];

    constructor() {
        this.leaderBoardData = leaderBoardData;
        this.forumData = forumData;
    }

    public getLeaderBoardData() {
        return this.leaderBoardData;
    }

    public getTopicList(currentPage: number, elementsPerPage: number): TTopicServerData {
        const topicList = [
            ...this.forumData
                .reduce((groupMap, object) => {
                    const key = object.topicId;

                    const item = groupMap.get(key) || {
                        topic: object.topic,
                        author: object.author,
                        messageQty: 0,
                        createDate: object.createDate,
                        dateLastMessage: object.createDate,
                        topicId: object.topicId,
                    };

                    item.messageQty += 1;

                    if (Date.parse(item.dateLastMessage) < Date.parse(object.createDate)) {
                        item.dateLastMessage = object.createDate;
                    }

                    return groupMap.set(key, item);
                }, new Map())
                .values(),
        ];

        return MockServer.sliceDataPerPage<TTopicList>(topicList, currentPage, elementsPerPage);
    }

    static sliceDataPerPage<T>(arr: T[], currentPage: number, elementsPerPage: number) {
        const items = arr.slice(
            (+currentPage! - 1) * elementsPerPage,
            +currentPage! * elementsPerPage
        );

        const lastPage = Math.ceil(arr.length / elementsPerPage);

        return { items, lastPage };
    }

    public getTopic(id: number, currentPage: number, elementsPerPage: number) {
        const topicData = this.forumData.filter(({ topicId }) => topicId === id);

        return MockServer.sliceDataPerPage<TForumData>(topicData, currentPage, elementsPerPage);
    }

    public getEmojis(messageId: number) {
        const topicData = this.forumData.filter(({ msgId }) => msgId === messageId);

        return topicData[0]?.emojis;
    }

    public postLike(messageId: number, key: string, email: string) {
        const topicData = this.forumData.filter(({ msgId }) => msgId === messageId);
        const emojiObj = topicData[0].emojis[key as keyof TEmojisType];
        const isLiked = emojiObj.users.includes(email);

        if (isLiked) {
            emojiObj.amount -= 1;
            emojiObj.users = emojiObj.users.filter((e: any) => e !== email);
        } else {
            emojiObj.amount += 1;
            emojiObj.users.push(email);
        }

        return topicData[0].emojis;
    }
}
export default MockServer;
