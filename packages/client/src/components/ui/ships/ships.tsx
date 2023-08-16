import React, { FC } from 'react';
import cn from 'classnames';
import style from './ships.module.scss';
import { TGame } from '@/store/slices/gameSlice';

export enum Position {
    left = 'left',
    right = 'right',
}

export enum Mode {
    placement = 'placement',
    battle = 'battle',
}

type TShips = {
    position?: Position;
    mode?: Mode;
    isUserShips?: boolean;
    ships: TGame['userShips'];
};

// todo: вернуть начальное количество кораблей, когда игра уже будет работать
export const defaultShipsCount = 0;

const Ships: FC<TShips> = props => {
    const { position = Position.right, mode = Mode.placement, isUserShips = false, ships } = props;

    const shipsClasses = cn(style.ships, {
        [style.left]: position === Position.left,
        [style.right]: position === Position.right,
    });

    const shipItemRowClasses = cn(style.shipItemRow, {
        [style.interActive]: isUserShips && mode === Mode.placement,
    });

    return (
        <div className={shipsClasses}>
            <div className={style.title}>
                {mode === Mode.battle ? 'Кораблей в строю:' : 'Доступно кораблей:'}
            </div>

            <div className={style.shipsContainer}>
                {Object.keys(ships).map(shipItemKey => (
                    <div className={shipItemRowClasses} key={shipItemKey}>
                        <div className={`${style.ship} ${style[shipItemKey]}`} />
                        <div className={style.count}>{ships[shipItemKey]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ships;
