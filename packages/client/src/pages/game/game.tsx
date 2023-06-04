import React, { FC, MouseEventHandler } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import style from './game.module.scss';
import Button from '../../components/ui/button/button';
import UserIcon from '../../components/ui/userIcon/userIcon';
import Ships from '../../components/ui/ships/ships';

// todo: использование пропсов - временное решение.
//  Необходимо заменить на использование глобального состояния, когда начнем его использовать.
type TGame = {
    mode?: string;
    move?: string;
    shipsCount?: number;
    gameOver?: string;
};

const Game: FC<TGame> = props => {
    const { mode = 'battle', move = 'user', shipsCount = 10, gameOver } = props;
    const navigate = useNavigate();

    const handleWinButtonClick: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        navigate('/game');
    };

    const handleDefeatButtonClick: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        navigate('/game');
    };

    const endGameModalClasses = cn(style.endGameModal, {
        [style.active]: !!gameOver,
    });

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
                            <UserIcon
                                type="game"
                                userData={{ firstName: 'Иск.', secondName: 'Интеллект' }}
                            />
                            <Ships mode={mode} position="left" />
                        </>
                    ) : null}
                </div>

                <div className={style.middle}>
                    <div className={style.canvasWindow}>
                        <canvas width={900} height={420} />
                    </div>

                    <div className={style.userInfoBlock}>
                        {mode === 'battle' && move === 'user' ? (
                            <span className={style.gameMessage}>Ваш ход!</span>
                        ) : null}

                        {mode === 'battle' && move === 'enemy' ? (
                            <span className={style.gameMessage}>Ход противника</span>
                        ) : null}

                        {mode === 'placement' && shipsCount ? (
                            <span className={style.gameMessage}>Расставьте корабли</span>
                        ) : null}

                        {mode === 'placement' && !shipsCount ? (
                            <Button buttonSize="medium">Готов к бою!</Button>
                        ) : null}
                    </div>
                </div>

                <div className={style.rightSide}>
                    <UserIcon type="game" />
                    <Ships mode={mode} isUserShips={true} />
                </div>
            </div>

            <div className={endGameModalClasses}>
                <div className={style.modalContent}>
                    <div className={style.modalTitle}>
                        {gameOver === 'win' && 'Вы победили!'}
                        {gameOver === 'defeat' && 'Вы проиграли :('}
                    </div>

                    {gameOver === 'win' ? (
                        <Button buttonSize="large" onClick={handleWinButtonClick}>
                            Ура!
                        </Button>
                    ) : null}

                    {gameOver === 'defeat' ? (
                        <Button onClick={handleDefeatButtonClick} buttonSize="large">
                            Угу
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Game;
