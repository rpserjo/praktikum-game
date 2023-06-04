import leaderBoardData from './data/mock-leaderbord-data.json';
import { TLeaderBoardData } from '@/types/data-types';

export default class MockServer {
    protected leaderBoardData: TLeaderBoardData[];

    constructor() {
        this.leaderBoardData = leaderBoardData;
    }

    public getLeaderBoardData() {
        return this.leaderBoardData;
    }
}
