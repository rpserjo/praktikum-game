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
            ratingFieldName: 'string',
            cursor: 0,
            limit: 0,
        };

        return this.http.post(API.ENDPOINTS.LEADERBOARD.ALL, options);
    }
}

export default LeaderBoardApi;
