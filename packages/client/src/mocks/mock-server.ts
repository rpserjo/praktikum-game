export default class MockServer {
    protected leaderBoardData: Record<string, unknown>[];

    constructor() {
        this.leaderBoardData = [
            {
                name: 'Петр',
                email: 'petr_taranov@mail.ru',
                login: 'Taran',
                winsCount: 5,
                lostCount: 7,
                score: 95,
            },
            {
                name: 'Борис',
                email: 'barbados@caribes.ru',
                login: 'Barbados',
                winsCount: 10,
                lostCount: 7,
                score: 87,
            },
            {
                name: 'Валентина',
                email: 'widow@black.hell',
                login: 'Black Widow',
                winsCount: 101,
                lostCount: 1,
                score: 99,
            },
            {
                name: 'Лёха',
                email: 'pro@gamer.ru',
                login: 'Lammer',
                winsCount: 1,
                lostCount: 3,
                score: 43,
            },
            {
                name: 'Иван',
                email: 'sparrow@black_pearl.ru',
                login: 'Captain Jack',
                winsCount: 100,
                lostCount: 3,
                score: 98,
            },
        ];
    }

    public getLeaderBoardData() {
        return this.leaderBoardData;
    }
}
