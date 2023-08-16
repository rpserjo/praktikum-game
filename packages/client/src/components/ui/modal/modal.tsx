import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import style from './modal.module.scss';

type MaodalProps = {
    isActive: boolean;
    children: ReactNode;
};

const Modal: FC<MaodalProps> = ({ isActive, children }) => {
    const newTopicModalClasses = cn(style.newTopicModal, {
        [style.active]: isActive,
    });

    return (
        <div className={newTopicModalClasses}>
            <div className={style.modalContent}>{children}</div>
        </div>
    );
};
export default Modal;
