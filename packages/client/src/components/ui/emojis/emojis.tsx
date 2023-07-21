import React, { FC } from 'react';
import MockServer from '@/mocks/mock-server';
import './emojis.scss';

type EmojiProps = {
    messageId: number;
};

const Emojis: FC<EmojiProps> = ({ messageId }) => {
    const mockServer = new MockServer();
    console.log(mockServer, messageId);
    const emojies = {
        like: 1,
        hmm: 0,
        heart: 1,
        ghost: 1,
        fire: 1,
        the_rooms: 4,
    };

    return (
        <div className="like-wrap">
            <div className="like-display">
                {emojies.like > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="like">
                            👍
                        </p>
                        <p className="like-display-amount">{emojies.like}</p>
                    </div>
                )}
                {emojies.hmm > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="hmm">
                            🫤
                        </p>
                        <p className="like-display-amount">{emojies.hmm}</p>
                    </div>
                )}
                {emojies.heart > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="heart">
                            ❤️
                        </p>
                        <p className="like-display-amount">{emojies.heart}</p>
                    </div>
                )}
                {emojies.ghost > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="ghost">
                            👻
                        </p>
                        <p className="like-display-amount">{emojies.ghost}</p>
                    </div>
                )}
                {emojies.fire > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="fire">
                            🔥
                        </p>
                        <p className="like-display-amount">{emojies.fire}</p>
                    </div>
                )}
                {emojies.the_rooms > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="the_rooms">
                            🫃
                        </p>
                        <p className="like-display-amount">{emojies.the_rooms}</p>
                    </div>
                )}
            </div>
            <div className="like-choice">
                <p className="like-choice-emoji" id="like">
                    👍
                </p>
                <p className="like-choice-emoji" id="hmm">
                    🫤
                </p>
                <p className="like-choice-emoji" id="heart">
                    ❤️
                </p>
                <p className="like-choice-emoji" id="ghost">
                    👻
                </p>
                <p className="like-choice-emoji" id="fire">
                    🔥
                </p>
                <p className="like-choice-emoji" id="the_rooms">
                    🫃
                </p>
                <p className="like-choice-text">React ♡</p>
            </div>
        </div>
    );
};

export default Emojis;
