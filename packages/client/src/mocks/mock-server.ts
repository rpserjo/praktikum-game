import leaderBoardData from './data/mock-leaderbord-data.json';
import forumData from './data/mock-forum-data.json';
import {
    TLeaderBoardData,
    TTopicData,
    TTopicInfo,
    TTopicListData,
    TTopicMessage,
    TTopicWithCommentsData,
} from '@/types/data-types';
import { TForumDataOld, TTopicList, TTopicServerData } from './mockDataTypes';

class MockServer {
    protected leaderBoardData: TLeaderBoardData[];

    protected forumData: TForumDataOld[];

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

        const result = MockServer.sliceDataPerPage<TTopicList>(
            topicList,
            currentPage,
            elementsPerPage
        );

        const items: TTopicData[] = result.items.map(item => {
            const newItem = {
                id: item.topicId,
                topic: item.topic,
                message: item.message,
                createdAt: item.createDate,
                author: item.author,
                commentsCount: 3,
                lastMessageDate: item.createDate,
            };
            return newItem;
        });

        return {
            items,
            lastPage: result.lastPage,
        };
    }

    static sliceDataPerPage<T>(arr: T[], currentPage: number, elementsPerPage: number) {
        const items = arr.slice(
            (+currentPage! - 1) * elementsPerPage,
            +currentPage! * elementsPerPage
        );

        const lastPage = Math.ceil(arr.length / elementsPerPage);

        return { items, lastPage };
    }

    public getTopic(id: number, currentPage: number, elementsPerPage: number): TTopicData {
        const topicData = this.forumData.filter(({ topicId }) => topicId === id);
        const result = MockServer.sliceDataPerPage<TForumDataOld>(
            topicData,
            currentPage,
            elementsPerPage
        ).items[0];
        return {
            id: result.topicId,
            topic: result.topic,
            message: result.message,
            createdAt: result.createDate,
            author: result.author,
            commentsCount: 3,
            lastMessageDate: result.createDate,
        };
    }

    // todo make method in api
    public getComments(id: number, currentPage: number, elementsPerPage: number) {
        const topicData = this.forumData.filter(({ topicId }) => topicId === id);
        return MockServer.sliceDataPerPage<TForumDataOld>(topicData, currentPage, elementsPerPage)
            .items;
    }

    private getTopicComments(id: number, currentPage: number, elementsPerPage: number) {
        const topicData = this.forumData.filter(({ topicId }) => topicId === id);
        const { items } = MockServer.sliceDataPerPage<TForumDataOld>(
            topicData,
            currentPage,
            elementsPerPage
        );

        // eslint-disable-next-line
        const comments = new Array<TTopicMessage>(); //todo get comments in the get topic???

        items.forEach(item => {
            comments.push({
                author: item.author,
                id: item.msgId,
                createdDate: item.createDate,
                text: item.message,
            });
        });
        return comments;
    }

    // todo last page where to put
    public getLastPage(id: number, currentPage: number, elementsPerPage: number) {
        const topicData = this.forumData.filter(({ topicId }) => topicId === id);
        return MockServer.sliceDataPerPage<TForumDataOld>(topicData, currentPage, elementsPerPage)
            .lastPage;
    }

    // todo where to put mapping and models
    public getTopicNew(id: number, currentPage: number, elementsPerPage: number): TTopicInfo {
        const result = this.getTopic(id, currentPage, elementsPerPage);
        return {
            id: result.id,
            title: result.topic,
            message: result.message,
            author: result.author,
            commentsCount: result.commentsCount,
            createdDate: result.createdAt,
            lastCommentDate: result.lastMessageDate,
        };
    }

    // todo do we need this together or with separate methods
    public getTopicWithComments(
        id: number,
        currentPage: number,
        elementsPerPage: number
    ): TTopicWithCommentsData {
        return {
            topic: this.getTopicNew(id, currentPage, elementsPerPage),
            comments: this.getTopicComments(id, currentPage, elementsPerPage),
            lastPage: this.getLastPage(id, currentPage, elementsPerPage),
        };
    }

    public getTopicListNew(currentPage: number, elementsPerPage: number): TTopicListData {
        const result = this.getTopicList(currentPage, elementsPerPage);
        // eslint-disable-next-line
        const topics = new Array<TTopicInfo>();

        result.items.forEach(item => {
            topics.push({
                author: item.author,
                id: item.id,
                title: item.topic,
                message: item.message,
                createdDate: item.createdAt,
                commentsCount: item.commentsCount,
                lastCommentDate: item.lastMessageDate,
            });
        });
        return {
            topics,
            lastPage: result.lastPage,
        };
    }
}
export default MockServer;
