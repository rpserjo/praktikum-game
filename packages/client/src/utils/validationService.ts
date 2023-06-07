export interface IValidationResult {
    errorMessage: string;
    isValid: boolean;
}

type ValidationInfo = {
    error: string;
    regex: RegExp;
};

class ValidationService {
    // eslint-disable-next-line
    private _validate(value: string, info: ValidationInfo): IValidationResult {
        return {
            errorMessage: info.error,
            isValid: info.regex.test(value),
        };
    }
    // eslint-disable-next-line
    private _getValidationInfo(name: string): ValidationInfo {
        switch (name) {
            case 'first_name':
            case 'second_name':
            case 'display_name':
                return {
                    error: 'Первая буква должна быть заглавной, не может содержать цифры, пробелы и спецсимволы',
                    regex: /^[A-Z]{1}[A-za-z-]*$/,
                };
            case 'login':
                return {
                    error: 'Длина от 3 до 20 символов, не может содержать цифры, пробелы и спецсимволы',
                    regex: /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/,
                };
            case 'password':
                return {
                    error: 'Длина от 8 до 40 символов, должен содержать хотя бы одну цифру или заглавную букву',
                    regex: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
                };
            case 'email':
                return {
                    error: 'Невалидный email',
                    // eslint-disable-next-line
                    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                };
            case 'phone':
                return {
                    error: 'Длина от 10 до 15 символов, может содержать только цифры или + в начале',
                    regex: /^((\+[0-9])|([0-9])){10,15}$/,
                };
            default:
                throw new Error('No validation rule is found for the field');
        }
    }

    public validateInput(name: string, value: string): IValidationResult | null {
        try {
            // eslint-disable-next-line
            const info = this._getValidationInfo(name);
            // eslint-disable-next-line
            return this._validate(value, info);
        } catch (error: unknown) {
            console.log((error as Error).message);
        }
        return null;
    }
}

export default new ValidationService();
