export type TLeaderBoardData = {
    name: string;
    login: string;
    winsCount: number;
    lostCount: number;
    score: number;
};

enum Emoji {
    Like = 'like',
    Hmm = 'hmm',
    Heart = 'heart',
    Ghost = 'ghost',
    Fire = 'fire',
    Rooms = 'the_rooms',
}

export type EmojiValue = {
    amount: number;
    users: Array<string>;
};

export type TEmojisType = {
    [Emoji.Like]: EmojiValue;
    [Emoji.Hmm]: EmojiValue;
    [Emoji.Heart]: EmojiValue;
    [Emoji.Ghost]: EmojiValue;
    [Emoji.Fire]: EmojiValue;
    [Emoji.Rooms]: EmojiValue;
};

export default TLeaderBoardData;
