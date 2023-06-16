export type TProfileProps = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar?: string;
};

export class SignInData {
    public login: string;

    public password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}
