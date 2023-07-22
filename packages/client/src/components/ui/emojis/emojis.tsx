import React, { FC } from 'react';
import MockServer from '@/mocks/mock-server';
import './emojis.scss';

type EmojiProps = {
    messageId: number;
};

const Emojis: FC<EmojiProps> = ({ messageId }) => {
    const mockServer = new MockServer();

    // событие по клику добавлять дату эмодзи
    // отрефакторить map для смайлов

    const emojis = mockServer.getEmojis(messageId);

    return (
        <div className="like-wrap">
            <div className="like-display">
                {emojis.like > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="like">
                            👍
                        </p>
                        <p className="like-display-amount">{emojis.like}</p>
                    </div>
                )}
                {emojis.hmm > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="hmm">
                            🫤
                        </p>
                        <p className="like-display-amount">{emojis.hmm}</p>
                    </div>
                )}
                {emojis.heart > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="heart">
                            ❤️
                        </p>
                        <p className="like-display-amount">{emojis.heart}</p>
                    </div>
                )}
                {emojis.ghost > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="ghost">
                            👻
                        </p>
                        <p className="like-display-amount">{emojis.ghost}</p>
                    </div>
                )}
                {emojis.fire > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="fire">
                            🔥
                        </p>
                        <p className="like-display-amount">{emojis.fire}</p>
                    </div>
                )}
                {emojis.the_rooms > 0 && (
                    <div className="like-display-item">
                        <p className="like-display-emoji" id="the_rooms">
                            🫃
                        </p>
                        <p className="like-display-amount">{emojis.the_rooms}</p>
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
