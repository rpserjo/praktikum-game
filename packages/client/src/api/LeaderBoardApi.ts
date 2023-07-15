import BaseApi from './BaseApi';
import API from '@/api/api';
// import { SignInData, SignUpData, TProfileProps } from '@/models/models';

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

    public async postLeaderboardData(data: any): Promise<void> {
        return this.http.post(API.ENDPOINTS.LEADERBOARD.POSTUSER, data);
    }
}

export default LeaderBoardApi;
