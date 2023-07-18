import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '@/components/ui';
import style from './buttons.module.scss';
import { RootState } from '@/store';
import { toggleSound } from '@/store/slices/gameSlice';

const SoundButton: FC = () => {
    const gameState = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const { isSoundOn } = gameState.game;

    const toggleSoundState = () => {
        dispatch(toggleSound());
    };

    return (
        <div className={style.soundButton}>
            <Button buttonSize="small" buttonStyle="outlined" onClick={toggleSoundState}>
                <div
                    className={style.soundButton__icon}
                    title={isSoundOn ? 'Выключить звук' : 'Включить звук'}
                >
                    <Icon iconName={isSoundOn ? 'soundOn' : 'soundOff'} />
                </div>
            </Button>
        </div>
    );
};
export default SoundButton;
