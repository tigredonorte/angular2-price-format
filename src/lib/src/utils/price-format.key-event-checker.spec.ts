/* Own modules */
import { PriceFormatKeyEventChecker } from './price-format.key-event-checker';

describe('PriceFormatKeyEventChecker', () => {
    let keyEventChecker: PriceFormatKeyEventChecker;
    let expectedDefaults: any;

    beforeEach(() => {
        keyEventChecker = new PriceFormatKeyEventChecker({});
        expectedDefaults = {};
    });

    it('should #expectedDefaults be the default value', () => {
        const defaultOptions = keyEventChecker.options;
        expect(defaultOptions).toEqual(expectedDefaults);
    });

    it('should options changing', () => {
        const expectedValidOptions = {
            minValue          : '1',
            maxValue          : '100000000',
            prefix            : '$ ',
            suffix            : '%',
            centsSeparator    : ',',
            thousandsSeparator: ' ',
            limit             : false,
            centsLimit        : 3,
            clearPrefix       : false,
            clearSuffix       : false,
            allowNegative     : true,
            insertPlusSign    : true,
            cssclass          : '',
            placeholder       : ''
        };

        keyEventChecker.updateOptions(expectedValidOptions);

        const currOptions = keyEventChecker.options;
        expect(currOptions).toEqual(expectedValidOptions);
    });
});
