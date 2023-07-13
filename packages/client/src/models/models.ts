export type TProfileProps = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar?: string;
};

export type TOAuthInData = {
    code: string;
    redirect_uri: string;
};

export class SignInData {
    public login: string;

    public password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}

export class SignUpData {
    public first_name: string;

    public second_name: string;

    public email: string;

    public phone: string;

    public login: string;

    public password: string;

    constructor(
        first_name: string,
        second_name: string,
        email: string,
        phone: string,
        login: string,
        password: string
    ) {
        this.first_name = first_name;
        this.second_name = second_name;
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.password = password;
    }
}
