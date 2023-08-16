import { RuleNames, ValidationResult } from './validationModels';

class ValidationService {
    private _rules = {
        [RuleNames.NAME]: {
            error: `Первая буква должна быть заглавной, 
                    не может содержать цифры, пробелы и спецсимволы`,
            regex: /^[A-ZА-Я]{1}[A-za-zА-яа-я-]*$/,
        },
        [RuleNames.LOGIN]: {
            error: 'Длина от 3 до 20 символов, не может содержать цифры, пробелы и спецсимволы',
            regex: /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/,
        },
        [RuleNames.PASSWORD]: {
            error: `Длина от 8 до 40 символов, должен содержать 
                    хотя бы одну цифру или заглавную букву`,
            regex: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
        },
        [RuleNames.EMAIL]: {
            error: 'Невалидный email',
            // eslint-disable-next-line
            regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        [RuleNames.PHONE]: {
            error: 'Длина от 10 до 15 символов, может содержать только цифры или + в начале',
            regex: /^((\+[0-9])|([0-9])){10,15}$/,
        },
    };

    public validateInput(type: RuleNames, value: string): ValidationResult {
        // eslint-disable-next-line
        const info = this._rules[type];
        return new ValidationResult(info.regex.test(value), info.error);
    }
}

export default new ValidationService();
