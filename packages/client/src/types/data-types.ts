export type TLeaderBoardData = {
    name: string;
    login: string;
    winsCount: number;
    lostCount: number;
    score: number;
};
export type TEmojis = {
    like: { amount: number; users: Array<string> };
    hmm: { amount: number; users: Array<string> };
    heart: { amount: number; users: Array<string> };
    ghost: { amount: number; users: Array<string> };
    fire: { amount: number; users: Array<string> };
    the_rooms: { amount: number; users: Array<string> };
};
export default TLeaderBoardData;
