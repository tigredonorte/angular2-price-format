"use strict";
/* Angular modules */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {?} minValue
 * @param {?} maxValue
 * @param {?} allowNegative
 * @return {?}
 */
function PriceFormatValidator(minValue, maxValue, allowNegative) {
    return function (c) {
        if (isNaN(c.value)) {
            return { priceFormatNotNumberError: { given: c.value } };
        }
        if (c.value < 0 && !allowNegative) {
            return { priceFormatNegativeError: { given: c.value } };
        }
        if (minValue !== '' && c.value < +minValue) {
            if (minValue < 0.01) {
                return { priceFormatMinValueError: { given: c.value, min: 0 } };
            }
            else {
                return { priceFormatMinValueError: { given: c.value, min: minValue } };
            }
        }
        if (maxValue !== '' && c.value > +maxValue) {
            return { priceFormatMaxValueError: { given: c.value, max: maxValue } };
        }
        return null;
    };
}
exports.PriceFormatValidator = PriceFormatValidator;
