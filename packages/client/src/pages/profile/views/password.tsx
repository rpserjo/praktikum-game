import React, { FC, FormEvent, MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ui';
import cn from 'classnames';
import UserApi from '@/api/UserApi';
import style from '../profile.module.scss';

const EditPasswordView: FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const navigate = useNavigate();

    const handleCancel: MouseEventHandler = e => {
        e.preventDefault();
        navigate(-1);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== repeatNewPassword) {
            alert('Новые пароли не совпадают');
            return;
        }

        const userApi = new UserApi();
        const data: Record<string, string> = {};
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        console.log(data);
        userApi
            .changePassword(data)
            .then(() => {
                alert('Пароль изменен');
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
                <h1>Смена пароля</h1>
                <div className={style.row}>
                    <label htmlFor="oldPassword">Текущий пароль</label>
                    <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="newPassword">Новый пароль</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="repeatNewPassword">Повторите новый пароль</label>
                    <input
                        type="password"
                        name="repeatNewPassword"
                        value={repeatNewPassword}
                        onChange={e => setRepeatNewPassword(e.target.value)}
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

export default EditPasswordView;
