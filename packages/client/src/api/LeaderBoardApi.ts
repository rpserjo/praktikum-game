import BaseApi from './BaseApi';
import API from '@/api/api';

type UserScoreData = {
    data: {
        name: string;
        email: string;
        login: string;
        winsCount: number;
        lostCount: number;
        score: number;
        doorsRating: number;
    };
    ratingFieldName: string;
    teamName: string;
};

class LeaderBoardApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.LEADERBOARD.ENDPOINT);
    }

    public getLeaderboardData() {
        const options: {
            ratingFieldName: string;
            cursor: number;
            limit: number;
        } = {
            ratingFieldName: 'doorsRating',
            cursor: 0,
            limit: 10,
        };

        return this.http.post(API.ENDPOINTS.LEADERBOARD.ALL, options);
    }

    public async postLeaderboardData(data: UserScoreData): Promise<void> {
        return this.http.post(API.ENDPOINTS.LEADERBOARD.POSTUSER, data);
    }
}

export default LeaderBoardApi;
