import React, { FC } from 'react';
import MockServer from '@/mocks/mock-server';
import { TEmojis } from '@/types/data-types';

import './emojis.scss';

type EmojiProps = {
    messageId: number;
};

const emojis = {
    like: '👍',
    hmm: '🫤',
    heart: '❤️',
    ghost: '👻',
    fire: '🔥',
    the_rooms: '🫃',
};

const Emojis: FC<EmojiProps> = ({ messageId }) => {
    const mockServer = new MockServer();
    const currentEmojis: TEmojis = mockServer.getEmojis(messageId);
    const emojisKeys = Object.keys(currentEmojis);
    // событие по клику добавлять дату эмодзи

    return (
        <div className="like-wrap">
            <div className="like-display">
                {emojisKeys.map(
                    key =>
                        // eslint-disable-next-line
                        currentEmojis[key as keyof TEmojis] > 0 && (
                            <div className="like-display-item" key={key}>
                                <p className="like-display-emoji" id="hmm">
                                    {emojis[key as keyof TEmojis]}
                                </p>
                                <p className="like-display-amount">
                                    {currentEmojis[key as keyof TEmojis]}
                                </p>
                            </div>
                        )
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
