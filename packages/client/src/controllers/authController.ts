import AuthApi, { ISignInData } from '@/api/AuthApi';

class AuthController {
    private _api: AuthApi;

    constructor() {
        // eslint-disable-next-line
        this._api = new AuthApi();
    }

    public async login(
        login: string,
        password: string,
        cb: () => void,
        errorCb: (error: string) => void
    ) {
        const data: ISignInData = { login, password };
        // eslint-disable-next-line
        await this._api
            .signin(data)
            .then(response => {
                console.log(response);
                cb();
            })
            .catch(response => {
                const error = response.response.data.reason;
                if (error === 'User already in system') {
                    cb();
                } else {
                    errorCb(error);
                }
            });
    }

    // eslint-disable-next-line
    public isLoggedIn() {
        // eslint-disable-next-line
        return false;
    }
}

export default new AuthController();
