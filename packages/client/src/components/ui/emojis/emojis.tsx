import React, { FC } from 'react';
import './emojis.scss';

type EmojiProps = {
    messageId: number;
};

const Emojis: FC<EmojiProps> = ({ messageId }) => {
    console.log(messageId);

    return (
        <div className="like-wrap">
            <div className="like-display">
                <div className="like-display-item">
                    <p className="like-display-emoji" id="like">
                        👍
                    </p>
                    <p className="like-display-amount">4</p>
                </div>
                <div className="like-display-item">
                    <p className="like-display-emoji" id="hmm">
                        🫤
                    </p>
                    <p className="like-display-amount">4</p>
                </div>
                <div className="like-display-item">
                    <p className="like-display-emoji" id="heart">
                        ❤️
                    </p>
                    <p className="like-display-amount">4</p>
                </div>
                <div className="like-display-item">
                    <p className="like-display-emoji" id="ghost">
                        👻
                    </p>
                    <p className="like-display-amount">4</p>
                </div>
                <div className="like-display-item">
                    <p className="like-display-emoji" id="fire">
                        🔥
                    </p>
                    <p className="like-display-amount">4</p>
                </div>
                <div className="like-display-item">
                    <p className="like-display-emoji" id="the_doors">
                        🫃
                    </p>
                    <p className="like-display-amount">4</p>
                </div>
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
                <p className="like-choice-emoji" id="the_doors">
                    🫃
                </p>
                <p className="like-choice-text">React ♡</p>
            </div>
        </div>
    );
};

export default Emojis;
