import { RuleNames } from './validationModels';
import ValidationService from './validationService';

describe('validation service', () => {
    test('check login rule not empty', () => {
        const name = '';

        const result = ValidationService.validateInput(RuleNames.NAME, name);
        expect(result.isValid).toEqual(false);
    });
    test('check login rule more than 2', () => {
        const name = 'qq';

        const result = ValidationService.validateInput(RuleNames.NAME, name);
        expect(result.isValid).toEqual(false);
    });
});
