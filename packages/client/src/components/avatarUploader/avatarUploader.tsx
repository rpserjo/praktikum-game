import React, { FC } from 'react';
import CameraIcon from '@/assets/ui/camera.svg';
import UserIcon from '@/assets/ui/user.svg';
import style from './avatarUploader.module.scss';
import UserApi from '@/api/UserApi';

type TAvatarUploaderProps = {
    currentAvatar: string | null;
};

const NoAvatar: FC = () => (
    <div className={style['no-avatar']}>
        <img src={UserIcon} alt="Аватар не установлен" />
    </div>
);

const AvatarUploader: FC<TAvatarUploaderProps> = ({ currentAvatar }) => {
    const avatar = currentAvatar ? (
        <img src={currentAvatar} alt="Аватар пользователя" />
    ) : (
        <NoAvatar />
    );
    const handleUpload = () => {
        const userApi = new UserApi();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
            if (input.files?.length && input.files[0]) {
                userApi
                    .avatar(input.files[0])
                    .then(response => {
                        console.log(response);
                        alert('Аватар загружен. Обновите страницу');
                    })
                    .catch(e => {
                        console.log(e);
                        alert(
                            `${e.code}: ${e.message} ${
                                e.response.data ? '\n' + e.response.data.reason : ''
                            }`
                        );
                    });
            }
        };
        input.click();
    };

    return (
        <div className={style['avatar-uploader']}>
            <div className={style['current-avatar']}>{avatar}</div>
            <button className={style['upload-icon']} onClick={handleUpload}>
                <img alt="Загрузить аватар" src={CameraIcon} />
            </button>
        </div>
    );
};

export default AvatarUploader;
