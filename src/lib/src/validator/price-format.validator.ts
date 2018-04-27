/* Angular modules */
import { ValidatorFn, AbstractControl} from '@angular/forms';

/*
 *  NOTE: This doesn't validate correctly for minValue less than 0.01.
 */
export function PriceFormatValidator(minValue: number|string, maxValue: number|string, allowNegative: boolean): ValidatorFn {
    return (c: AbstractControl): any => {
        if (isNaN(c.value)) {
            return {priceFormatNotNumberError: {given: c.value}};
        }
        if (c.value < 0 && !allowNegative) {
            return {priceFormatNegativeError:  {given: c.value}};
        }
        if (minValue !== '' && c.value < +minValue) {
            if (minValue < 0.01) {
                return {priceFormatMinValueError:  {given: c.value, min: 0}};
            } else {
                return {priceFormatMinValueError:  {given: c.value, min: minValue}};
            }
        }
        if (maxValue !== '' && c.value > +maxValue) {
            return {priceFormatMaxValueError:  {given: c.value, max: maxValue}};
        }
        return null;
    };
}
