import React, { FC, useState } from 'react';
import MockServer from '@/mocks/mock-server';
import userData from '@/mocks/data/user-data.json';
import { EmojiValue, TEmojisType } from '@/types/data-types';

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
    const datatEmojis: TEmojisType = mockServer.getEmojis(messageId);
    const dataKeys = Object.keys(datatEmojis);

    const [currentEmojis, setCurrentEmojis] = useState(datatEmojis);
    const [emojisKeys, setEmojisKeys] = useState(dataKeys);

    function likeActivate(key: string) {
        const newData = mockServer.postLike(messageId, key, userData.user.email);
        setCurrentEmojis(newData);
        const newKeys = Object.keys(currentEmojis);
        setEmojisKeys(newKeys);
    }

    const isUserLikeClass = (emoji: EmojiValue, email: string) => {
        const isUserEmoji = emoji.users.includes(email);
        return isUserEmoji ? 'like-display-item-liked' : '';
    };

    return (
        <div className="like-wrap">
            <div className="like-display">
                {emojisKeys.map(key => {
                    const currentEmoji = currentEmojis[key as keyof TEmojisType];

                    if (currentEmoji.amount > 0) {
                        const likeClass = `like-display-item ${isUserLikeClass(
                            currentEmoji,
                            userData.user.email
                        )}`;
                        return (
                            <div
                                className={likeClass}
                                key={key}
                                onClick={() => likeActivate(key)}
                                role="presentation"
                            >
                                <p className="like-display-emoji" id={key}>
                                    {emojis[key as keyof TEmojisType]}
                                </p>
                                <p className="like-display-amount">{currentEmoji.amount}</p>
                            </div>
                        );
                    }
                    return '';
                })}
            </div>
            <div className="like-choice">
                {dataKeys.map(key => (
                    <p
                        className="like-choice-emoji"
                        id={key}
                        key={key}
                        onClick={() => likeActivate(key)}
                        role="presentation"
                    >
                        {emojis[key as keyof TEmojisType]}
                    </p>
                ))}

                <p className="like-choice-text">React ♡</p>
            </div>
        </div>
    );
};

export default Emojis;
