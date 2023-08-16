export class ValidationResult {
    errorMessage: string;

    isValid: boolean;

    constructor(isValid: boolean, errorMessage: string) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
}

// eslint-disable-next-line
export enum RuleNames {
    NAME,
    LOGIN,
    PASSWORD,
    EMAIL,
    PHONE,
}
