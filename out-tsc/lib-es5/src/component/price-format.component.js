"use strict";
/* Angular modules */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var price_format_options_1 = require("../utils/price-format.options");
var price_format_transformer_1 = require("../utils/price-format.transformer");
var price_format_validator_1 = require("../validator/price-format.validator");
var PriceFormatComponent = (function () {
    function PriceFormatComponent() {
        this._price = '';
        this.error = '';
        this.disabledModelChanges = true;
        this.focusOn = false;
        this.doingChanges = false;
        this.rawValue = null;
        this.touchedChange = function () { };
        this.propagateChange = function () { };
        this.validateFn = function () { };
        this.disabled = false;
        this.init();
    }
    Object.defineProperty(PriceFormatComponent.prototype, "price", {
        /**
         * @return {?}
         */
        get: function () {
            return this.formatter.toNumber(this._price);
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (typeof val === 'undefined' || val === null || val.toString() === 'NaN') {
                val = 0;
            }
            var /** @type {?} */ v = val.toString();
            try {
                var /** @type {?} */ price = this.formatter.priceFormat(v);
                var /** @type {?} */ price2 = this.formatter.toNumber(price);
                if (this.focusOn === false) {
                    price = this.formatter.clearPrefix(price);
                    price = this.formatter.clearSuffix(price);
                }
                if (price2 !== 0) {
                    this._price = price;
                    this.propagateChange(this.formatter.toNumber(price));
                }
                else {
                    this._price = price;
                    this.propagateChange(0);
                }
            }
            catch (e) {
                console.warn('PRICE FORMAT SET PRICE EXCEPTION!', e);
                this._price = '0';
                this.propagateChange(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PriceFormatComponent.prototype.ngOnInit = function () {
        this.touchedChange(false);
        this.focusInEvent();
        this.validateFn = price_format_validator_1.PriceFormatValidator(this.options['minValue'], this.options['maxValue'], this.options['allowNegative']);
    };
    /**
     * @return {?}
     */
    PriceFormatComponent.prototype.ngAfterViewChecked = function () {
        this.disabledModelChanges = false;
    };
    /**
     * @return {?}
     */
    PriceFormatComponent.prototype.isDisabled = function () {
        return this.disabled;
    };
    /**
     * @return {?}
     */
    PriceFormatComponent.prototype.focusInEvent = function () {
        try {
            this.focusOn = true;
            this.touchedChange(true);
            var /** @type {?} */ price = this._price;
            if (this.options['clearPrefix']) {
                price = this.formatter.addPrefix(price);
            }
            if (this.options['clearSuffix']) {
                price = this.formatter.addSuffix(price);
            }
            this.price = price;
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @return {?}
     */
    PriceFormatComponent.prototype.focusOutEvent = function () {
        try {
            this.focusOn = false;
            var /** @type {?} */ price = this.priceIt();
            if (this.options['clearPrefix']) {
                price = this.formatter.clearPrefix(price);
            }
            if (this.options['clearSuffix']) {
                price = this.formatter.clearSuffix(price);
            }
            this.price = price;
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    PriceFormatComponent.prototype.handleKeyboardKeyDown = function (e) {
        try {
            var /** @type {?} */ code = (e.keyCode ? e.keyCode : e.which);
            var /** @type {?} */ typed = String.fromCharCode(code);
            if (isNaN(Number(typed))) {
                if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
                    var /** @type {?} */ temp = code - ((code >= 96) ? 96 : 48);
                    typed = temp.toString();
                }
            }
            var /** @type {?} */ str = this._price;
            var /** @type {?} */ functional = this.isFunctional(code);
            if (!functional) {
                var /** @type {?} */ newValue = this.formatter.priceFormat(str.concat(typed));
                if (str !== newValue) {
                    this.price = this.formatter.change(newValue);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @param {?} code
     * @return {?}
     */
    PriceFormatComponent.prototype.isFunctional = function (code) {
        if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
            return true;
        }
        if (code === 8) {
            return true;
        }
        if (code === 9) {
            return true;
        }
        if (code === 13) {
            return true;
        }
        if (code === 46) {
            return true;
        }
        if (code === 37) {
            return true;
        }
        if (code === 39) {
            return true;
        }
        if (this.options['allowNegative'] && (code === 189 || code === 109)) {
            return true;
        }
        if (this.options['insertPlusSign'] && (code === 187 || code === 107)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    PriceFormatComponent.prototype.handleKeyboardKeyUp = function (e) {
        try {
            this.price = this.priceIt();
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @return {?}
     */
    PriceFormatComponent.prototype.priceIt = function () {
        var /** @type {?} */ price = this.formatter.priceFormat(this._price);
        if (this._price !== price) {
            price = this.formatter.change(price);
        }
        return price;
    };
    /**
     * ********************************************
     * *BEGIN implementation of OnChanges interface**
     * *********************************************
     * @param {?} inputs
     * @return {?}
     */
    PriceFormatComponent.prototype.ngOnChanges = function (inputs) {
        try {
            this.doingChanges = true;
            if (inputs['options']) {
                this.getOptions(inputs);
                this.initOptions();
                this.updateValidateFn(inputs['options']);
                this.updatePrice(inputs['options']);
                if (this.rawValue !== null) {
                    this.price = this.fillValue(this.rawValue);
                }
            }
        }
        catch (e) {
            console.warn(e);
        }
        this.doingChanges = false;
    };
    /**
     * @param {?} inputs
     * @return {?}
     */
    PriceFormatComponent.prototype.getOptions = function (inputs) {
        try {
            if (typeof inputs['options']['previousValue'] === 'string') {
                inputs['options']['previousValue'] = JSON.parse(inputs['options']['previousValue']);
            }
        }
        catch (e) {
            console.warn(e, inputs, this.options);
        }
        try {
            if (typeof inputs['options']['currentValue'] === 'string') {
                /**
                 * GAMBIS REPORT - THOM 05/05/2017 (check blotter component to another piece of this gambis)
                 *
                 * Angular does not update @inputs object if this is set in Ts file,
                 * so i convert it with JSON.stringify
                 */
                inputs['options']['currentValue'] = JSON.parse(inputs['options']['currentValue']);
                this.options = inputs['options']['currentValue'];
            }
        }
        catch (e) {
            console.warn(e);
        }
        return inputs;
    };
    /**
     * @return {?}
     */
    PriceFormatComponent.prototype.initOptions = function () {
        try {
            this.opt.updateOptions(this.options);
            this.options = this.opt.getOptions();
            this.formatter.updateOptions(this.options);
        }
        catch (e) {
            console.warn(e);
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PriceFormatComponent.prototype.updateValidateFn = function (options) {
        try {
            this.validateFn = price_format_validator_1.PriceFormatValidator(this.options['minValue'], this.options['maxValue'], this.options['allowNegative']);
        }
        catch (e) {
            console.warn(e);
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PriceFormatComponent.prototype.updatePrice = function (options) {
        try {
            if (!options['currentValue'] || !options['previousValue'] || typeof options['currentValue']['centsLimit'] === 'undefined') {
                return;
            }
            if (typeof options['previousValue']['centsLimit'] === 'undefined') {
                this.price = this.priceIt();
            }
            else if (options['previousValue']['centsLimit'] !== options['currentValue']['centsLimit']) {
                this.price = this.priceIt();
            }
        }
        catch (e) {
            console.warn(e);
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    PriceFormatComponent.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    /**
     * writeValue(obj: any) is the method that writes a new value from the form model
     * into the view or (if needed) DOM property. This is where we want to update our
     * counterValue model, as that’s the thing that is used in the view.
     * @param {?} value
     * @return {?}
     */
    PriceFormatComponent.prototype.writeValue = function (value) {
        this.rawValue = value;
        if (value) {
            try {
                this.price = this.fillValue(value);
            }
            catch (e) {
                console.warn(e);
                this.price = 0;
            }
        }
        else {
            this.price = 0;
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    PriceFormatComponent.prototype.fillValue = function (val) {
        return parseFloat(val).toFixed(this.options['centsLimit']);
    };
    /**
     * registerOnChange(fn: any) is a method that registers a handler that should
     * be called when something in the view has changed. It gets a function
     * that tells other form directives and form controls to update their values.
     * In other words, that’s the handler function we want to call whenever
     * price changes through the view.
     * @param {?} fn
     * @return {?}
     */
    PriceFormatComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * registerOnTouched(fn: any) Similiar to registerOnChange(), this registers
     * a handler specifically for when a control receives a touch event.
     * We don’t need that in our custom control.
     * @param {?} fn
     * @return {?}
     */
    PriceFormatComponent.prototype.registerOnTouched = function (fn) {
        this.touchedChange = fn;
    };
    /**
     * This function is called when the control status changes to or from 'DISABLED'.
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param {?} isDisabled
     * @return {?}
     */
    PriceFormatComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * *****************************************************
     * *END implementation of ControlValueAccessor interface**
     * ******************************************************
     * @return {?}
     */
    PriceFormatComponent.prototype.init = function () {
        this.opt = new price_format_options_1.PriceFormatOptions(this.options);
        this.options = this.opt.getOptions();
        this.formatter = new price_format_transformer_1.PriceFormatTransformer(this.options);
    };
    return PriceFormatComponent;
}());
PriceFormatComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'price-format',
                templateUrl: './price-format.component',
                providers: [
                    { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return PriceFormatComponent; }), multi: true },
                    { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return PriceFormatComponent; }), multi: true }
                ]
            },] },
];
/**
 * @nocollapse
 */
PriceFormatComponent.ctorParameters = function () { return []; };
PriceFormatComponent.propDecorators = {
    '_price': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'readonly': [{ type: core_1.Input },],
    'csserror': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
};
exports.PriceFormatComponent = PriceFormatComponent;
function PriceFormatComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PriceFormatComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PriceFormatComponent.ctorParameters;
    /** @type {?} */
    PriceFormatComponent.propDecorators;
    /** @type {?} */
    PriceFormatComponent.prototype._price;
    /** @type {?} */
    PriceFormatComponent.prototype.disabled;
    /** @type {?} */
    PriceFormatComponent.prototype.readonly;
    /** @type {?} */
    PriceFormatComponent.prototype.csserror;
    /** @type {?} */
    PriceFormatComponent.prototype.options;
    /** @type {?} */
    PriceFormatComponent.prototype.error;
    /** @type {?} */
    PriceFormatComponent.prototype.disabledModelChanges;
    /** @type {?} */
    PriceFormatComponent.prototype.formatter;
    /** @type {?} */
    PriceFormatComponent.prototype.keyEvents;
    /** @type {?} */
    PriceFormatComponent.prototype.opt;
    /** @type {?} */
    PriceFormatComponent.prototype.focusOn;
    /** @type {?} */
    PriceFormatComponent.prototype.doingChanges;
    /** @type {?} */
    PriceFormatComponent.prototype.rawValue;
    /** @type {?} */
    PriceFormatComponent.prototype.touchedChange;
    /** @type {?} */
    PriceFormatComponent.prototype.propagateChange;
    /** @type {?} */
    PriceFormatComponent.prototype.validateFn;
}
