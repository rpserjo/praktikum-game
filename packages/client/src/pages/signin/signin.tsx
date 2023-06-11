import React, { FC, FormEvent } from 'react';
import AuthApi, { ISignInData } from '@/api/AuthApi';

const SignIn: FC = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: ISignInData = { login: '', password: '' };
        formData.forEach((value, key) => {
            data[key as keyof ISignInData] = value.toString();
        });
        const authApi = new AuthApi();
        authApi
            .signin(data)
            .then(response => {
                alert('success');
                console.log(response);
            })
            .catch(error => {
                alert(`Error: ${error.code}`);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="login" value="Taran_87" />
            <input type="text" name="password" value="Taran087" />
            <input type="submit" value="login" />
        </form>
    );
};

export default SignIn;
