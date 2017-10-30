/* Own modules */
import { PriceFormatValidator } from './price-format.validator';

describe('PriceFormatValidator', () => {
    let validateFn: any = () => { };
    let validateFnMin: any = () => { };
    let validateFnMax: any = () => { };
    let validateFnNeg: any = () => { };
    let validateFnMinMax: any = () => { };
    let validateFnMinNeg: any = () => { };
    let validateFnMaxNeg: any = () => { };
    let validateFnMinMaxNeg: any = () => { };

    let minNeg = -1000000;
    let maxNeg = -1;
    let min    =  1;
    let max    =  1000000;

    beforeAll(() => {
        validateFn          = PriceFormatValidator('', '', false);
        validateFnMin       = PriceFormatValidator(min, '', false);
        validateFnMax       = PriceFormatValidator('', max, false);
        validateFnNeg       = PriceFormatValidator('', '', true);
        validateFnMinMax    = PriceFormatValidator(min, max, false);
        validateFnMinNeg    = PriceFormatValidator(minNeg, '', true);
        validateFnMaxNeg    = PriceFormatValidator('', maxNeg, true);
        validateFnMinMaxNeg = PriceFormatValidator(minNeg, maxNeg, true);
    });

    it('NaN values must be invalid', () => {
        const c = { value: NaN };
        const expected = { priceFormatNotNumberError: { given: c.value } };

        expect(validateFn(c)).toEqual(expected);
        expect(validateFnMin(c)).toEqual(expected);
        expect(validateFnMax(c)).toEqual(expected);
        expect(validateFnNeg(c)).toEqual(expected);
        expect(validateFnMinMax(c)).toEqual(expected);
        expect(validateFnMinNeg(c)).toEqual(expected);
        expect(validateFnMaxNeg(c)).toEqual(expected);
        expect(validateFnMinMaxNeg(c)).toEqual(expected);
    });

    it('negative values must be valid', () => {
        const c = { value: -10 };

        expect(validateFnNeg(c)).toBeNull();
        expect(validateFnMinNeg(c)).toBeNull();
        expect(validateFnMaxNeg(c)).toBeNull();
        expect(validateFnMinMaxNeg(c)).toBeNull();
    });

    it('negative values must be invalid', () => {
        const c = { value: -10 };
        const expected = { priceFormatNegativeError: { given: c.value } };

        expect(validateFn(c)).toEqual(expected);
        expect(validateFnMin(c)).toEqual(expected);
        expect(validateFnMax(c)).toEqual(expected);
        expect(validateFnMinMax(c)).toEqual(expected);
    });

    it('values less than minimun value when defined must be invalid', () => {
        const c = { value: min - 1 };

        expect(validateFn(c)).toBeNull();
        expect(validateFnMax(c)).toBeNull();
        expect(validateFnNeg(c)).toBeNull();
        // This gets priceFormatMaxValueError
        expect(validateFnMaxNeg(c)).not.toBeNull();

        let expected = { priceFormatMinValueError: { given: c.value, min: min } };
        expect(validateFnMin(c)).toEqual(expected);
        expect(validateFnMinMax(c)).toEqual(expected);

        expected = { priceFormatMinValueError: { given: c.value, min: minNeg } };
        expect(validateFnMinNeg(c)).toBeNull();
        expect(validateFnMinMaxNeg(c)).not.toBeNull();

        expected = { priceFormatMinValueError: { given: (minNeg - 1), min: 0 } };
        expect(validateFnMinNeg({value: (minNeg - 1)})).toEqual(expected);
        expect(validateFnMinMaxNeg({value: (minNeg - 1)})).toEqual(expected);
    });

    it('values greater than maximun value when defined must be invalid', () => {
        const c = { value: max + 1 };

        expect(validateFn(c)).toBeNull();
        expect(validateFnMin(c)).toBeNull();
        expect(validateFnNeg(c)).toBeNull();
        expect(validateFnMinNeg(c)).toBeNull();

        let expected = { priceFormatMaxValueError: { given: c.value, max: max } };
        expect(validateFnMax(c)).toEqual(expected);
        expect(validateFnMinMax(c)).toEqual(expected);

        expected = { priceFormatMaxValueError: { given: c.value, max: maxNeg } };
        expect(validateFnMaxNeg(c)).toEqual(expected);
        expect(validateFnMinMaxNeg(c)).toEqual(expected);

        expected = { priceFormatMaxValueError: { given: (maxNeg + 1), max: maxNeg } };
        expect(validateFnMaxNeg({value: (maxNeg + 1)})).toEqual(expected);
        expect(validateFnMinMaxNeg({value: (maxNeg + 1)})).toEqual(expected);
    });

    it('positive values must be valid', () => {
        let c = { value: min + 1 };
        expect(validateFn(c)).toBeNull();
        expect(validateFnMin(c)).toBeNull();
        expect(validateFnMax(c)).toBeNull();
        expect(validateFnNeg(c)).toBeNull();
        expect(validateFnMinMax(c)).toBeNull();
        expect(validateFnMinNeg(c)).toBeNull();

        c = { value: max + 1 };
        expect(validateFn(c)).toBeNull();
        expect(validateFnMin(c)).toBeNull();
        expect(validateFnNeg(c)).toBeNull();
        expect(validateFnMinNeg(c)).toBeNull();
    });

    it('positive values must not be valid', () => {
        let c = { value: min + 1 };
        expect(validateFnMaxNeg(c)).not.toBeNull();
        expect(validateFnMinMaxNeg(c)).not.toBeNull();

        c = { value: max + 1 };
        expect(validateFnMax(c)).not.toBeNull();
        expect(validateFnMinMax(c)).not.toBeNull();
        expect(validateFnMaxNeg(c)).not.toBeNull();
        expect(validateFnMinMaxNeg(c)).not.toBeNull();
    });

    it('zero must be valid', () => {
        const c = { value: 0 };

        expect(validateFn(c)).toBeNull();
        expect(validateFnMin(c)).not.toBeNull();
        expect(validateFnMax(c)).toBeNull();
        expect(validateFnNeg(c)).toBeNull();
        expect(validateFnMinMax(c)).not.toBeNull();
        expect(validateFnMinNeg(c)).toBeNull();
        expect(validateFnMaxNeg(c)).not.toBeNull();
        expect(validateFnMinMaxNeg(c)).not.toBeNull();
    });
});
