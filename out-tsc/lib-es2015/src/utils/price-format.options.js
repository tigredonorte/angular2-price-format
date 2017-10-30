export class PriceFormatOptions {
    /**
     * @param {?} options
     */
    constructor(options) {
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
    updateOptions(options) {
        this.options = Object.assign(this.defaults, options);
        if (isNaN(this.options['centsLimit']) || this.options['centsLimit'] < 0) {
            this.options['centsLimit'] = 2;
        }
        this.current = Object.assign(this.options, {});
    }
    /**
     * @return {?}
     */
    getOptions() {
        return this.options;
    }
}
function PriceFormatOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    PriceFormatOptions.prototype.defaults;
    /** @type {?} */
    PriceFormatOptions.prototype.current;
    /** @type {?} */
    PriceFormatOptions.prototype.options;
}
;
