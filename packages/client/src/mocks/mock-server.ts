import leaderBoardData from './data/mock-leaderbord-data.json';

export type TLeaderBoardData = {
    name: string;
    email: string;
    login: string;
    winsCount: number;
    lostCount: number;
    score: number;
};

export default class MockServer {
    protected leaderBoardData: TLeaderBoardData[];

    constructor() {
        this.leaderBoardData = leaderBoardData;
    }

    public getLeaderBoardData() {
        return this.leaderBoardData;
    }
}
