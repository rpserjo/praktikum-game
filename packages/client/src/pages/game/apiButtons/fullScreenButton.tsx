import React, { FC, useState } from 'react';
import { Button, Icon } from '@/components/ui';
import style from './buttons.module.scss';

const FullscreenButton: FC = () => {
    const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement !== null);

    const handleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setIsFullScreen(true);
            } else if (document.exitFullscreen) {
                await document.exitFullscreen();
                setIsFullScreen(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={style.buttonFullscreen}>
            <Button buttonSize="small" buttonStyle="outlined" onClick={handleFullscreen}>
                <div
                    className={style.icon}
                    title={isFullScreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
                >
                    <Icon iconName={isFullScreen ? 'exitFullScreen' : 'enterFullScreen'} />
                </div>
            </Button>
        </div>
    );
};
export default FullscreenButton;
