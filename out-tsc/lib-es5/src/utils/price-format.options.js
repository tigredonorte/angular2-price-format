"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PriceFormatOptions = (function () {
    /**
     * @param {?} options
     */
    function PriceFormatOptions(options) {
        this.defaults = {
            minValue: '',
            maxValue: '',
            prefix: 'R$ ',
            suffix: '',
            centsSeparator: '.',
            thousandsSeparator: ',',
            limit: false,
            centsLimit: 2,
            clearPrefix: true,
            clearSuffix: true,
            allowNegative: false,
            insertPlusSign: false,
            cssclass: '',
            placeholder: ''
        };
        this.current = {};
        this.options = {};
        this.current = Object.assign(this.defaults, {});
        this.updateOptions(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    PriceFormatOptions.prototype.updateOptions = function (options) {
        this.options = Object.assign(this.defaults, options);
        if (isNaN(this.options['centsLimit']) || this.options['centsLimit'] < 0) {
            this.options['centsLimit'] = 2;
        }
        this.current = Object.assign(this.options, {});
    };
    /**
     * @return {?}
     */
    PriceFormatOptions.prototype.getOptions = function () {
        return this.options;
    };
    return PriceFormatOptions;
}());
exports.PriceFormatOptions = PriceFormatOptions;
function PriceFormatOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    PriceFormatOptions.prototype.defaults;
    /** @type {?} */
    PriceFormatOptions.prototype.current;
    /** @type {?} */
    PriceFormatOptions.prototype.options;
}
;
