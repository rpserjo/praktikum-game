import React, { FC, FormEvent, MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileFields, TProfileProps } from '@pages/profile/profile';
import cn from 'classnames';
import { Button } from '@ui';
import UserApi from '@/api/UserApi';

import style from '../profile.module.scss';

const EditProfileView: FC<{ userData: TProfileProps | undefined }> = ({ userData }) => {
    const [firstName, setFirstName] = useState(userData?.first_name);
    const [lastName, setLastName] = useState(userData?.second_name);
    const [displayName, setDisplayName] = useState(userData?.display_name);
    const [email, setEmail] = useState(userData?.email);
    const [phone, setPhone] = useState(userData?.phone);
    const [login, setLogin] = useState(userData?.login);
    const navigate = useNavigate();

    const handleCancel: MouseEventHandler = e => {
        e.preventDefault();
        navigate(-1);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: Record<string, string> = {};
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const userApi = new UserApi();
        userApi
            .user(data)
            .then(() => {
                navigate(-1);
                alert('Данные сохранены');
            })
            .catch(error => {
                console.log(error);
                alert(
                    `${error.code}: ${error.message} ${
                        error.response.data ? '\n' + error.response.data.reason : ''
                    }`
                );
            });
    };

    return (
        <div className={style['form-wrapper']}>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1>Редактирование профиля</h1>
                <div className={style.row}>
                    <label htmlFor="first_name">{ProfileFields.FIRST_NAME}</label>
                    <input
                        type="text"
                        name="first_name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="first_name">{ProfileFields.SECOND_NAME}</label>
                    <input
                        type="text"
                        name="second_name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="login">{ProfileFields.DISPLAY_NAME}</label>
                    <input
                        type="text"
                        name="display_name"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="email">{ProfileFields.EMAIL}</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="first_name">{ProfileFields.PHONE}</label>
                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="login">{ProfileFields.LOGIN}</label>
                    <input
                        type="text"
                        name="login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                </div>
                <div className={cn(style.actions, style['space-between'])}>
                    <Button buttonSize="medium" buttonStyle="outlined" onClick={handleCancel}>
                        Отменить
                    </Button>
                    <Button buttonSize="medium" buttonStyle="normal" type="submit">
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileView;
