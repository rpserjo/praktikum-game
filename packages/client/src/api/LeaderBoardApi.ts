import BaseApi from './BaseApi';
import API from '@/api/api';
// import { SignInData, SignUpData, TProfileProps } from '@/models/models';

class LeaderBoardApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.LEADERBOARD.ENDPOINT);
    }

    public getLeaderboardData() {
        return this.http.get(API.ENDPOINTS.LEADERBOARD.ALL);
    }
}

export default LeaderBoardApi;
