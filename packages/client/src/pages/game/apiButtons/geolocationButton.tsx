import React, { FC } from 'react';
import { Button, Icon } from '@/components/ui';
import style from './buttons.module.scss';
import geolocationService from '@/utils/geolocation/geolocationService';

const GeolocationButton: FC = () => {
    const showGeolocation = () => {
        geolocationService.showAddressInfo();
    };

    return (
        <div className={style.locationButton}>
            <Button buttonSize="small" buttonStyle="outlined" onClick={showGeolocation}>
                <div className={style.locationButton__icon} title="Показать адрес">
                    <Icon iconName="location" />
                </div>
            </Button>
        </div>
    );
};
export default GeolocationButton;
