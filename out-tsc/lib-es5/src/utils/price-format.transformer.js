"use strict";
/* Own modules */
Object.defineProperty(exports, "__esModule", { value: true });
var price_format_options_1 = require("./price-format.options");
var PriceFormatTransformer = (function () {
    /**
     * @param {?} options
     */
    function PriceFormatTransformer(options) {
        this.maxSize = 16;
        this.options = {};
        var t = new price_format_options_1.PriceFormatOptions(options);
        options = t.getOptions();
        this.updateOptions(options);
    }
    /**
     * @param {?} price
     * @return {?}
     */
    PriceFormatTransformer.prototype.addPrefix = function (price) {
        return this.change(this.options['prefix'] + price);
    };
    /**
     * @param {?} price
     * @return {?}
     */
    PriceFormatTransformer.prototype.addSuffix = function (price) {
        return this.change(price + this.options['suffix']);
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    PriceFormatTransformer.prototype.change = function (newValue) {
        var /** @type {?} */ temp = this.getCleanValue(newValue);
        if (temp.length > this.maxSize) {
            temp = temp.substr(0, this.maxSize);
            newValue = this.priceFormat(temp);
            console.log('this number reached the maximum size. This number will be truncated to: ' + newValue);
        }
        return newValue;
    };
    /**
     * @param {?} price
     * @return {?}
     */
    PriceFormatTransformer.prototype.clearPrefix = function (price) {
        if (this.trim(this.options['prefix']) !== '' && this.options['clearPrefix']) {
            var /** @type {?} */ array = price.split(this.options['prefix']);
            return this.change(array[1]);
        }
        return price;
    };
    /**
     * @param {?} price
     * @return {?}
     */
    PriceFormatTransformer.prototype.clearSuffix = function (price) {
        if (this.trim(this.options['suffix']) !== '' && this.options['clearSuffix']) {
            var /** @type {?} */ array = price.split(this.options['suffix']);
            return this.change(array[0]);
        }
        return price;
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    PriceFormatTransformer.prototype.getCleanValue = function (newValue) {
        var /** @type {?} */ temp = newValue;
        temp = temp.split(this.options['prefix']).join('');
        temp = temp.split(this.options['suffix']).join('');
        temp = temp.split(this.options['thousandsSeparator']).join('');
        temp = temp.split(this.options['centsSeparator']).join('');
        return temp;
    };
    /**
     * @param {?} num
     * @return {?}
     */
    PriceFormatTransformer.prototype.priceFormatNumber = function (num) {
        return this.priceFormat(num.toFixed(this.options['centsLimit']));
    };
    /**
     * @param {?} str
     * @return {?}
     */
    PriceFormatTransformer.prototype.priceFormat = function (str) {
        var /** @type {?} */ temp = this.toNumbers(str);
        var /** @type {?} */ formatted = this.fillWithZeroes(temp);
        var /** @type {?} */ thousandsFormatted = '';
        var /** @type {?} */ thousandsCount = 0;
        var /** @type {?} */ centsVal = formatted.substr(formatted.length - this.options['centsLimit'], this.options['centsLimit']);
        var /** @type {?} */ integerVal = formatted.substr(0, formatted.length - this.options['centsLimit']);
        if (this.options['centsLimit'] === 0) {
            this.options['centsSeparator'] = '';
            centsVal = '';
        }
        formatted = (this.options['centsLimit'] === 0) ? integerVal : integerVal + this.options['centsSeparator'] + centsVal;
        if (this.options['thousandsSeparator'] || this.trim(this.options['thousandsSeparator']) !== '') {
            for (var /** @type {?} */ j = integerVal.length; j > 0; j--) {
                var /** @type {?} */ char_ = integerVal.substr(j - 1, 1);
                thousandsCount++;
                if (thousandsCount % 3 === 0) {
                    char_ = this.options['thousandsSeparator'] + char_;
                }
                thousandsFormatted = char_ + thousandsFormatted;
            }
            if (thousandsFormatted.substr(0, 1) === this.options['thousandsSeparator']) {
                thousandsFormatted = thousandsFormatted.substring(1, thousandsFormatted.length);
            }
            formatted = (this.options['centsLimit'] === 0) ?
                thousandsFormatted :
                thousandsFormatted + this.options['centsSeparator'] + centsVal;
        }
        if (this.options['allowNegative'] && (integerVal !== '0' || centsVal !== '0')) {
            if (str.indexOf('-') !== -1 && str.indexOf('+') < str.indexOf('-')) {
                formatted = '-' + formatted;
            }
            else {
                if (!this.options['insertPlusSign']) {
                    formatted = '' + formatted;
                }
                else {
                    formatted = '+' + formatted;
                }
            }
        }
        if (this.options['prefix']) {
            formatted = this.options['prefix'] + formatted;
        }
        if (this.options['suffix']) {
            formatted = formatted + this.options['suffix'];
        }
        return formatted;
    };
    /**
     * @param {?} price
     * @return {?}
     */
    PriceFormatTransformer.prototype.toNumber = function (price) {
        price = this.getCleanValue(price);
        var /** @type {?} */ pow = Math.pow(10, parseInt(this.options['centsLimit'], 10));
        var /** @type {?} */ v = parseFloat(price);
        var /** @type {?} */ div = v / pow;
        return parseFloat(div.toString());
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PriceFormatTransformer.prototype.updateOptions = function (options) {
        this.options = options;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    PriceFormatTransformer.prototype.fillWithZeroes = function (str) {
        var /** @type {?} */ limit = parseInt(this.options['centsLimit'], 10) + 1;
        while (str.length < limit) {
            str = '0' + str;
        }
        return str;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    PriceFormatTransformer.prototype.toNumbers = function (str) {
        var /** @type {?} */ formatted = '';
        for (var /** @type {?} */ i = 0; i < (str.length); i++) {
            var /** @type {?} */ char_ = str.charAt(i);
            if (formatted.length === 0 && char_ === '0') {
                continue;
            }
            if (char_ && char_.match(/[0-9]/)) {
                if (this.options['limit']) {
                    if (formatted.length < this.options['limit']) {
                        formatted = formatted + char_;
                    }
                }
                else {
                    formatted = formatted + char_;
                }
            }
        }
        return formatted;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    PriceFormatTransformer.prototype.trim = function (str) {
        if (typeof str !== 'string') {
            return str;
        }
        return str.replace(/^\s+|\s+$/g, '');
    };
    return PriceFormatTransformer;
}());
exports.PriceFormatTransformer = PriceFormatTransformer;
function PriceFormatTransformer_tsickle_Closure_declarations() {
    /** @type {?} */
    PriceFormatTransformer.prototype.maxSize;
    /** @type {?} */
    PriceFormatTransformer.prototype.options;
}
