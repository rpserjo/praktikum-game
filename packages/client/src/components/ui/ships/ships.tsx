import React, { FC, MouseEventHandler, useState } from 'react';
import cn from 'classnames';
import style from './ships.module.scss';

type TShips = {
    position?: string;
    mode?: string;
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

const Ships: FC<TShips> = props => {
    const [fleet, setFleet] = useState<TShipsMapping>({ ...shipsMapping });
    const { position = 'right', mode = 'placement', isUserShips = false } = props;

    const shipsClasses = cn(style.ships, {
        [style.left]: position === 'left',
        [style.right]: position === 'right',
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
            <div className={style.title}>{mode === 'battle' ? 'Кораблей в строю:' : 'Доступно кораблей:'}</div>

            <div className={style.shipsContainer}>
                {Object.keys(fleet).map(shipItemKey => (
                    <div className={`${style.shipItemRow} ${isUserShips && style.userShip}`} key={shipItemKey}>
                        <button aria-label={shipItemKey} className={`${style.ship} ${style[shipItemKey]}`} data-rank={shipItemKey} onClick={onClickShip} />

                        <div className={style.count}>{shipsMapping[shipItemKey].count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ships;
