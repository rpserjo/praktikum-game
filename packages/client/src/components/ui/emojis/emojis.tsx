import React, { FC, useState } from 'react';
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
    const datatEmojis: TEmojis = mockServer.getEmojis(messageId);
    const dataKeys = Object.keys(datatEmojis);

    const [currentEmojis, SetcurrentEmojis] = useState(datatEmojis);
    const [emojisKeys, SetemojisKeys] = useState(dataKeys);

    function likeActivate(key: string) {
        const newData = mockServer.postLike(messageId, key);
        SetcurrentEmojis(newData);
        const newKeys = Object.keys(currentEmojis);
        SetemojisKeys(newKeys);
    }

    return (
        <div className="like-wrap">
            <div className="like-display">
                {emojisKeys.map(
                    key =>
                        // eslint-disable-next-line
                        currentEmojis[key as keyof TEmojis] > 0 && (
                            <div
                                className="like-display-item"
                                key={key}
                                onClick={() => likeActivate(key)}
                                role="presentation"
                            >
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
