/* Angular modules */
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { PriceFormatOptions } from '../utils/price-format.options';
import { PriceFormatTransformer } from '../utils/price-format.transformer';
import { PriceFormatValidator } from '../validator/price-format.validator';
export class PriceFormatComponent {
    constructor() {
        this._price = '';
        this.error = '';
        this.disabledModelChanges = true;
        this.focusOn = false;
        this.doingChanges = false;
        this.rawValue = null;
        this.touchedChange = () => { };
        this.propagateChange = () => { };
        this.validateFn = () => { };
        this.disabled = false;
        this.init();
    }
    /**
     * @return {?}
     */
    get price() {
        return this.formatter.toNumber(this._price);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set price(val) {
        if (typeof val === 'undefined' || val === null || val.toString() === 'NaN') {
            val = 0;
        }
        const /** @type {?} */ v = val.toString();
        try {
            let /** @type {?} */ price = this.formatter.priceFormat(v);
            let /** @type {?} */ price2 = this.formatter.toNumber(price);
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.touchedChange(false);
        this.focusInEvent();
        this.validateFn = PriceFormatValidator(this.options['minValue'], this.options['maxValue'], this.options['allowNegative']);
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.disabledModelChanges = false;
    }
    /**
     * @return {?}
     */
    isDisabled() {
        return this.disabled;
    }
    /**
     * @return {?}
     */
    focusInEvent() {
        try {
            this.focusOn = true;
            this.touchedChange(true);
            let /** @type {?} */ price = this._price;
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
    }
    /**
     * @return {?}
     */
    focusOutEvent() {
        try {
            this.focusOn = false;
            let /** @type {?} */ price = this.priceIt();
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleKeyboardKeyDown(e) {
        try {
            let /** @type {?} */ code = (e.keyCode ? e.keyCode : e.which);
            let /** @type {?} */ typed = String.fromCharCode(code);
            if (isNaN(Number(typed))) {
                if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
                    let /** @type {?} */ temp = code - ((code >= 96) ? 96 : 48);
                    typed = temp.toString();
                }
            }
            const /** @type {?} */ str = this._price;
            const /** @type {?} */ functional = this.isFunctional(code);
            if (!functional) {
                const /** @type {?} */ newValue = this.formatter.priceFormat(str.concat(typed));
                if (str !== newValue) {
                    this.price = this.formatter.change(newValue);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @param {?} code
     * @return {?}
     */
    isFunctional(code) {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleKeyboardKeyUp(e) {
        try {
            this.price = this.priceIt();
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @return {?}
     */
    priceIt() {
        let /** @type {?} */ price = this.formatter.priceFormat(this._price);
        if (this._price !== price) {
            price = this.formatter.change(price);
        }
        return price;
    }
    /**
     * ********************************************
     * *BEGIN implementation of OnChanges interface**
     * *********************************************
     * @param {?} inputs
     * @return {?}
     */
    ngOnChanges(inputs) {
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
    }
    /**
     * @param {?} inputs
     * @return {?}
     */
    getOptions(inputs) {
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
    }
    /**
     * @return {?}
     */
    initOptions() {
        try {
            this.opt.updateOptions(this.options);
            this.options = this.opt.getOptions();
            this.formatter.updateOptions(this.options);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    updateValidateFn(options) {
        try {
            this.validateFn = PriceFormatValidator(this.options['minValue'], this.options['maxValue'], this.options['allowNegative']);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    updatePrice(options) {
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
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this.validateFn(c);
    }
    /**
     * writeValue(obj: any) is the method that writes a new value from the form model
     * into the view or (if needed) DOM property. This is where we want to update our
     * counterValue model, as that’s the thing that is used in the view.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} val
     * @return {?}
     */
    fillValue(val) {
        return parseFloat(val).toFixed(this.options['centsLimit']);
    }
    /**
     * registerOnChange(fn: any) is a method that registers a handler that should
     * be called when something in the view has changed. It gets a function
     * that tells other form directives and form controls to update their values.
     * In other words, that’s the handler function we want to call whenever
     * price changes through the view.
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * registerOnTouched(fn: any) Similiar to registerOnChange(), this registers
     * a handler specifically for when a control receives a touch event.
     * We don’t need that in our custom control.
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.touchedChange = fn;
    }
    /**
     * This function is called when the control status changes to or from 'DISABLED'.
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * *****************************************************
     * *END implementation of ControlValueAccessor interface**
     * ******************************************************
     * @return {?}
     */
    init() {
        this.opt = new PriceFormatOptions(this.options);
        this.options = this.opt.getOptions();
        this.formatter = new PriceFormatTransformer(this.options);
    }
}
PriceFormatComponent.decorators = [
    { type: Component, args: [{
                selector: 'price-format',
                templateUrl: './price-format.component',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PriceFormatComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PriceFormatComponent), multi: true }
                ]
            },] },
];
/**
 * @nocollapse
 */
PriceFormatComponent.ctorParameters = () => [];
PriceFormatComponent.propDecorators = {
    '_price': [{ type: Input },],
    'disabled': [{ type: Input },],
    'readonly': [{ type: Input },],
    'csserror': [{ type: Input },],
    'options': [{ type: Input },],
};
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
