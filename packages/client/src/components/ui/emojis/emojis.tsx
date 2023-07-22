import React, { FC, useState } from 'react';
import MockServer from '@/mocks/mock-server';
import userData from '@/mocks/data/user-data.json';
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
    const datatEmojis: TEmojis = mockServer.getEmojis(messageId);
    const dataKeys = Object.keys(datatEmojis);

    const [currentEmojis, setCurrentEmojis] = useState(datatEmojis);
    const [emojisKeys, SetemojisKeys] = useState(dataKeys);

    function likeActivate(key: string) {
        const newData = mockServer.postLike(messageId, key, userData.user.email);
        setCurrentEmojis(newData);
        const newKeys = Object.keys(currentEmojis);
        SetemojisKeys(newKeys);
    }

    return (
        <div className="like-wrap">
            <div className="like-display">
                {emojisKeys.map(key => {
                    if (currentEmojis[key as keyof TEmojis].amount > 0) {
                        const likeClass = `like-display-item ${
                            currentEmojis[key as keyof TEmojis].users.includes(userData.user.email)
                                ? 'like-display-item-liked'
                                : ''
                        }`;
                        return (
                            <div
                                className={likeClass}
                                key={key}
                                onClick={() => likeActivate(key)}
                                role="presentation"
                            >
                                <p className="like-display-emoji" id={key}>
                                    {emojis[key as keyof TEmojis]}
                                </p>
                                <p className="like-display-amount">
                                    {currentEmojis[key as keyof TEmojis].amount}
                                </p>
                            </div>
                        );
                    }
                    return '';
                })}
            </div>
            <div className="like-choice">
                <p
                    className="like-choice-emoji"
                    id="like"
                    onClick={() => likeActivate('like')}
                    role="presentation"
                >
                    👍
                </p>
                <p
                    className="like-choice-emoji"
                    id="hmm"
                    onClick={() => likeActivate('hmm')}
                    role="presentation"
                >
                    🫤
                </p>
                <p
                    className="like-choice-emoji"
                    id="heart"
                    onClick={() => likeActivate('heart')}
                    role="presentation"
                >
                    ❤️
                </p>
                <p
                    className="like-choice-emoji"
                    id="ghost"
                    onClick={() => likeActivate('ghost')}
                    role="presentation"
                >
                    👻
                </p>
                <p
                    className="like-choice-emoji"
                    id="fire"
                    onClick={() => likeActivate('fire')}
                    role="presentation"
                >
                    🔥
                </p>
                <p
                    className="like-choice-emoji"
                    id="the_rooms"
                    onClick={() => likeActivate('the_rooms')}
                    role="presentation"
                >
                    🫃
                </p>
                <p className="like-choice-text">React ♡</p>
            </div>
        </div>
    );
};

export default Emojis;
