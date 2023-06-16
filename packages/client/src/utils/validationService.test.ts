import { RuleNames } from './validationModels';
import ValidationService from './validationService';

// eslint-disable-next-line
describe('validation service', () => {
    // eslint-disable-next-line
    test('check login rule not empty', () => {
        //  check that correct rule, check validation???

        const name = '';

        const result = ValidationService.validateInput(RuleNames.NAME, name);
        // eslint-disable-next-line
        expect(result.isValid).toEqual(false);
    });
    // eslint-disable-next-line
    test('check login rule more than 2', () => {
        //  check that correct rule, check validation???

        const name = 'qq';

        const result = ValidationService.validateInput(RuleNames.NAME, name);
        // eslint-disable-next-line
        expect(result.isValid).toEqual(false);
    });
});
