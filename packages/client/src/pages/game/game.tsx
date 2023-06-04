import React, { FC } from 'react';
import style from './game.module.scss';
import Button from '../../components/ui/button/button';
import UserIcon from '../../components/ui/userIcon/userIcon';
import Ships from '../../components/ui/ships/ships';

const Game: FC = () => {
    // const { mode = 'battle' } = props;
    const mode = 'battle';

    return (
        <div className={style.gamePage}>
            <h1 className={style.title}>Одиночная игра</h1>

            <div className={style.buttonContainer}>
                <Button buttonSize="medium">Выйти из игры</Button>
            </div>

            <div className={style.content}>
                <div className={style.leftSide}>
                    {mode === 'battle' ? (
                        <>
                            <UserIcon type="game" userData={{ firstName: 'Иск.', secondName: 'Интеллект' }} />
                            <Ships mode={mode} position="left" />
                        </>
                    ) : null}
                </div>

                <div className={style.middle}>
                    <div className={style.canvasWindow}>
                        <canvas width={900} height={420} />
                    </div>
                </div>

                <div className={style.rightSide}>
                    <UserIcon type="game" />
                    <Ships mode={mode} isUserShips={true} />
                </div>
            </div>
        </div>
    );
};

export default Game;
