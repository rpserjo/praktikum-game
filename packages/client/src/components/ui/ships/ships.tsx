import React, { FC, MouseEventHandler, useState } from 'react';
import cn from 'classnames';
import style from './ships.module.scss';

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
};

type TShipsMapping = {
    [key: string]: {
        [key: string]: number;
    };
};

const shipsMapping: TShipsMapping = {
    rank1: {
        count: 1,
    },
    rank2: {
        count: 2,
    },
    rank3: {
        count: 3,
    },
    rank4: {
        count: 4,
    },
};

export const defaultShipsCount = 10;

const Ships: FC<TShips> = props => {
    const [fleet, setFleet] = useState<TShipsMapping>({ ...shipsMapping });
    const { position = Position.right, mode = Mode.placement, isUserShips = false } = props;

    const shipsClasses = cn(style.ships, {
        [style.left]: position === Position.left,
        [style.right]: position === Position.right,
    });

    const shipItemRowClasses = cn(style.shipItemRow, {
        [style.interActive]: isUserShips && mode === Mode.placement,
    });

    const onClickShip: MouseEventHandler<HTMLButtonElement> = event => {
        const element = event.target as HTMLButtonElement;
        const key: string = element.getAttribute('data-rank') || '';
        const shipsCount = Number(fleet[key].count);

        const newFleet: TShipsMapping = {
            ...fleet,
            [key]: { count: shipsCount - 1 },
        };

        if (shipsCount) {
            setFleet({ ...newFleet });
        }
    };

    return (
        <div className={shipsClasses}>
            <div className={style.title}>
                {mode === Mode.battle ? 'Кораблей в строю:' : 'Доступно кораблей:'}
            </div>

            <div className={style.shipsContainer}>
                {Object.keys(fleet).map(shipItemKey => (
                    <div className={shipItemRowClasses} key={shipItemKey}>
                        <button
                            aria-label={shipItemKey}
                            disabled={!isUserShips || mode === Mode.battle}
                            className={`${style.ship} ${style[shipItemKey]}`}
                            data-rank={shipItemKey}
                            onClick={onClickShip}
                        />
                        <div className={style.count}>{fleet[shipItemKey].count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ships;
