/* Own modules */
import { PriceFormatOptions } from './price-format.options';

describe('PriceFormatOptions', () => {
    let formatOptions: PriceFormatOptions;
    let expectedDefaults: any = {
        minValue          : '',
        maxValue          : '',
        prefix            : 'R$ ',
        suffix            : '',
        centsSeparator    : '.',
        thousandsSeparator: ',',
        limit             : false,
        centsLimit        : 2,
        clearPrefix       : true,
        clearSuffix       : true,
        allowNegative     : false,
        insertPlusSign    : false,
        cssclass          : '',
        placeholder       : ''
    };

    beforeEach(() => {
        formatOptions = new PriceFormatOptions({});
    });

    it('should #expectedDefaults be the default value', () => {
        const defaultOptions = formatOptions.getOptions();
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

        formatOptions.updateOptions(expectedValidOptions);

        const currOptions = formatOptions.getOptions();
        expect(currOptions).toEqual(expectedValidOptions);
    });

    it('should options changing with invalid centsLimit', () => {
        const expectedValidOptions = {
            minValue          : '1',
            maxValue          : '100000000',
            prefix            : '$ ',
            suffix            : '%',
            centsSeparator    : ',',
            thousandsSeparator: ' ',
            limit             : false,
            centsLimit        : NaN,
            clearPrefix       : false,
            clearSuffix       : false,
            allowNegative     : true,
            insertPlusSign    : true,
            cssclass          : '',
            placeholder       : ''
        };

        formatOptions.updateOptions(expectedValidOptions);
        expectedValidOptions.centsLimit = 2;

        const currOptions = formatOptions.getOptions();
        expect(currOptions).toEqual(expectedValidOptions);
    });
});
