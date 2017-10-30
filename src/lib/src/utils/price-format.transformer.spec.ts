/* Own modules */
import { PriceFormatTransformer } from './price-format.transformer';

xdescribe('PriceFormatTransformer', () => {
    let transformer: PriceFormatTransformer;
    let expectedDefaultOptions: any = {
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

    it('should #expectedDefaults be the default value', () => {
        transformer = new PriceFormatTransformer({});
        const defaultOptions = transformer.options;
        expect(defaultOptions).toEqual(expectedDefaultOptions);
    });

    describe('custom full options', () => {
        const expectedValidOptions = {
            minValue          : '1',
            maxValue          : '100000000',
            prefix            : '$ ',
            suffix            : '%',
            centsSeparator    : ',',
            thousandsSeparator: ' ',
            limit             : false,
            centsLimit        : 3,
            clearPrefix       : true,
            clearSuffix       : true,
            allowNegative     : true,
            insertPlusSign    : true,
            cssclass          : '',
            placeholder       : ''
        };

        beforeAll(() => {
            transformer = new PriceFormatTransformer(expectedValidOptions);
        });

        it('should options changing', () => {
            const defaultOptions = transformer.options;
            expect(defaultOptions).toEqual(expectedValidOptions);
        });

        it('should get a clean value', () => {
          // In this case, thousandsSeparator is ' ', and not '.' as default
            const dirtyValue = '$ 1.234 567,890 %';
            const cleanValue = '1.234567890';
            expect(transformer.getCleanValue(dirtyValue)).toEqual(cleanValue);
        });

        it('should get a negative clean value', () => {
            const dirtyValue = '- $ 1.234 567,890 %';
            const cleanValue = '-1.234567890';
            expect(transformer.getCleanValue(dirtyValue)).toEqual(cleanValue);
        });

        it('should prefix being added and cleared as expected', () => {
            let inputValue = '$      1234.56';
            let resultValue = transformer.clearPrefix(inputValue);
            let expectValue = '1234.56';
            expect(resultValue).toEqual(expectValue);

            inputValue = '1234.56';
            resultValue = transformer.addPrefix(inputValue);
            expectValue = '$ 1234.56';
            expect(resultValue).toEqual(expectValue);

            transformer.options['clearPrefix'] = false;
            inputValue = '$ 1234.56';
            resultValue = transformer.clearPrefix(inputValue);
            expectValue = '$ 1234.56';
            expect(resultValue).toEqual(expectValue);
        });

        it('should suffix being added and cleared', () => {
            let inputValue = '1234.56      %';
            let resultValue = transformer.clearPrefix(inputValue);
            let expectValue = '1234.56';
            expect(resultValue).toEqual(expectValue);

            inputValue = '1234.56';
            resultValue = transformer.addSuffix(inputValue);
            expectValue = '1234.56%';
            expect(resultValue).toEqual(expectValue);

            transformer.options['clearSuffix'] = false;
            inputValue = '1234.56%';
            resultValue = transformer.clearPrefix(inputValue);
            expectValue = '1234.56%';
            expect(resultValue).toEqual(expectValue);
        });
    });

    describe('after options check', () => {
        beforeAll(() => {
            transformer = new PriceFormatTransformer({});
        });

        it('should get correct number from string with centsLimit=2', () => {
            let strInt = '123456';
            let numInt = 1234.56;
            expect(transformer.toNumber(strInt)).toEqual(numInt);

            strInt = '1.23456';
            numInt = 1.23;
            expect(transformer.toNumber(strInt)).toEqual(numInt);
        });

        it('should get correct negative number from string with centsLimit=2', () => {
            let strInt = '-123456';
            let numInt = -1234.56;
            expect(transformer.toNumber(strInt)).toEqual(numInt);

            strInt = '-1.23456';
            numInt = -1.23;
            expect(transformer.toNumber(strInt)).toEqual(numInt);
        });

        it('should price being correctly formatted', () => {
            const strPrice = '-R$123456.789%';
            let expFormPrice = 'R$ 123,456.79';
            const strFormPrice = transformer.priceFormat(strPrice);
            expect(strFormPrice).toEqual(expFormPrice);

            const intPrice = -123456789;
            expFormPrice = 'R$ 123,456,789.00';
            const intFormPrice = transformer.priceFormatNumber(intPrice);
            expect(intFormPrice).toEqual(expFormPrice);
        });

        it('should value not being changed', () => {
            const pureValue = 'R$ 12.345.678,90';
            const changedValue = transformer.change(pureValue);
            expect(changedValue).toEqual(pureValue);
        });

        it('should value being correctly changed', () => {
            const pureValue = 'R$ 123.456.789.012.345.678,90';
            const    expectedValue = 'R$ 1.234.567.890.123.456,78';

            const changedValue = transformer.change(pureValue);
            expect(changedValue).toEqual(expectedValue);
        });
    });
});
