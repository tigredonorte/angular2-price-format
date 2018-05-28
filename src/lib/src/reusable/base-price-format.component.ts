/* Angular modules */
import { Input, OnChanges } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PriceFormatOptionsModel, PriceFormatOptionsDefaults } from '../utils/price-format.options';
import { PriceFormatValidator } from '../validator/price-format.validator';
import { BaseFieldComponet, TranslationObject } from './base-field.component';

/* Own modules */
export class BasePriceFormatComponent extends BaseFieldComponet implements OnChanges {

  @Input() _price = '';
  @Input() disabled: boolean;
  @Input() readonly: string;
  @Input() csserror: string;
  @Input() options: PriceFormatOptionsModel = PriceFormatOptionsDefaults;

  public numberMask = [];

  ngOnChanges(data) {
    super.ngOnChanges(data);
    if (data['options']) {
      this.numberMask = createNumberMask(this.options);
    }
  }
  // error = '';
  // disabledModelChanges = true;
  // formatter: PriceFormatTransformer;
  // keyEvents: PriceFormatKeyEventChecker;
  // opt: PriceFormatOptions;
  // focusOn = false;

  // private doingChanges = false;
  // private rawValue: any = null;

  // touchedChange: any = () => { };
  // propagateChange: any = () => { };
  // validateFn: any = () => { };

  // get price(): string | number {
  //   return this.formatter.toNumber(this._price);
  // }

  // set price(val) {
  //   if (typeof val === 'undefined' || val === null || val.toString() === 'NaN') { val = 0; }
  //   const v = val.toString();
  //   try {
  //     let price = this.formatter.priceFormat(v);
  //     let price2 = this.formatter.toNumber(price);
  //     if (this.focusOn === false) {
  //       price = this.formatter.clearPrefix(price);
  //       price = this.formatter.clearSuffix(price);
  //     }

  //     if (price2 !== 0) {
  //       this._price = price;
  //       this.propagateChange(this.formatter.toNumber(price));
  //     } else {
  //       this._price = price;
  //       this.propagateChange(0);
  //     }

  //   } catch (e) {
  //     console.warn('PRICE FORMAT SET PRICE EXCEPTION!', e);
  //     this._price = '0';
  //     this.propagateChange(0);
  //   }
  // }

  // constructor() {
  //   super();
  //   this.disabled = false;
  //   this.init();
  // }

  // ngOnInit() {
  //   this.touchedChange(false);
  //   this.focusInEvent();
  //   this.validateFn = PriceFormatValidator(this.options['minValue'], this.options['maxValue'], this.options['allowNegative']);
  // }

  // ngAfterViewChecked() {
  //   this.disabledModelChanges = false;
  // }

  // public isDisabled() {
  //   return this.disabled;
  // }

  // public focusInEvent() {
  //   try {
  //     this.focusOn = true;
  //     this.touchedChange(true);
  //     let price = this._price;
  //     if (this.options['clearPrefix']) { price = this.formatter.addPrefix(price); }
  //     if (this.options['clearSuffix']) { price = this.formatter.addSuffix(price); }
  //     this.price = price;
  //   } catch (e) { console.log(e); }
  // }

  // public focusOutEvent() {
  //   try {
  //     this.focusOn = false;
  //     let price = this.priceIt();
  //     if (this.options['clearPrefix']) { price = this.formatter.clearPrefix(price); }
  //     if (this.options['clearSuffix']) { price = this.formatter.clearSuffix(price); }
  //     this.price = price;
  //   } catch (e) { console.log(e); }
  // }

  // public handleKeyboardKeyDown(e: KeyboardEvent) {
  //   try {
  //     let code = (e.keyCode ? e.keyCode : e.which);
  //     let typed = String.fromCharCode(code);
  //     if (isNaN(Number(typed))) {
  //       if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
  //         let temp = code - ((code >= 96) ? 96 : 48);
  //         typed = temp.toString();
  //       }
  //     }

  //     const isBackspace = c => c === 8;
  //     const isDelete = c => c === 46;
  //     const str = String(this._price);
  //     const functional = this.isFunctional(code);
  //     let newValue = '0';
  //     if (!functional) {
  //       newValue = this.formatter.priceFormat(str.concat(typed));
  //       if (str !== newValue) {
  //         this.price = this.formatter.change(newValue);
  //       }
  //       e.preventDefault();
  //     } else if (isBackspace(code) || isDelete(code)) {
  //       newValue = this.formatter.priceFormat(str.slice(0, -1));
  //       if (str !== newValue) {
  //         this.price = this.formatter.change(newValue);
  //       }
  //       e.preventDefault();
  //     }
  //   } catch (e) { console.log(e); }
  // }

  // private isFunctional(code: number) {
  //   if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) { return false; }
  //   if (code === 8) { return true; }
  //   if (code === 9) { return true; }
  //   if (code === 13) { return true; }
  //   if (code === 46) { return true; }
  //   if (code === 37) { return true; }
  //   if (code === 39) { return true; }
  //   if (this.options['allowNegative'] && (code === 189 || code === 109)) { return true; }
  //   if (this.options['insertPlusSign'] && (code === 187 || code === 107)) { return true; }
  //   return false;
  // }

  // public handleKeyboardKeyUp(e: KeyboardEvent) {
  //   try {
  //     this.price = this.priceIt();
  //   } catch (e) { console.log(e); }
  // }

  // private priceIt() {
  //   let price = this.formatter.priceFormat(this._price);
  //   if (this._price !== price) {
  //     price = this.formatter.change(price);
  //   }
  //   return price;
  // }

  // ngOnChanges(inputs: any) {
  //   try {
  //     this.doingChanges = true;
  //     if (inputs['options']) {
  //       this.getOptions(inputs);
  //       this.initOptions();
  //       this.updateValidateFn(inputs['options']);
  //       this.updatePrice(inputs['options']);
  //       if (this.rawValue !== null) {
  //         this.price = this.fillValue(this.rawValue);
  //       }
  //     }
  //   } catch (e) { console.warn(e); }
  //   this.doingChanges = false;
  // }

  // private getOptions(inputs: any) {
  //   try {
  //     if (typeof inputs['options']['previousValue'] === 'string') {
  //       inputs['options']['previousValue'] = JSON.parse(inputs['options']['previousValue']);
  //     }
  //   } catch (e) {
  //     console.warn(e, inputs, this.options);
  //   }

  //   try {
  //     if (typeof inputs['options']['currentValue'] === 'string') {
  //       inputs['options']['currentValue'] = JSON.parse(inputs['options']['currentValue']);
  //       this.options = inputs['options']['currentValue'];
  //     }

  //   } catch (e) {
  //     console.warn(e);
  //   }
  //   return inputs;
  // }

  // private initOptions() {
  //   try {
  //     this.opt.updateOptions(this.options);
  //     this.options = this.opt.getOptions();
  //     this.formatter.updateOptions(this.options);
  //   } catch (e) { console.warn(e); }
  // }

  // private updateValidateFn(options) {
  //   try {
  //     this.validateFn = PriceFormatValidator(
  //       this.options['minValue'],
  //       this.options['maxValue'],
  //       this.options['allowNegative']
  //     );
  //   } catch (e) { console.warn(e); }
  // }

  // private updatePrice(options) {
  //   try {
  //     if (!options['currentValue'] || !options['previousValue'] || typeof options['currentValue']['centsLimit'] === 'undefined') {
  //       return;
  //     }

  //     if (typeof options['previousValue']['centsLimit'] === 'undefined') {
  //       this.price = this.priceIt();
  //     } else if (options['previousValue']['centsLimit'] !== options['currentValue']['centsLimit']) {
  //       this.price = this.priceIt();
  //     }
  //   } catch (e) { console.warn(e); }
  // }

  // validate(c: FormControl) {
  //   return this.validateFn(c);
  // }

  // /**********************************************************
  //  **BEGIN implementation of ControlValueAccessor interface**
  //  **********************************************************/

  // /**
  //  * writeValue(obj: any) is the method that writes a new value from the form model
  //  * into the view or (if needed) DOM property. This is where we want to update our
  //  * counterValue model, as that’s the thing that is used in the view.
  //  */
  // writeValue(value: any) {
  //   this.rawValue = value;
  //   if (value) {
  //     try {
  //       this.price = this.fillValue(value);
  //     } catch (e) {
  //       console.warn(e);
  //       this.price = 0;
  //     }
  //   } else { this.price = 0; }
  // }

  // private fillValue(val: string): string {
  //   return parseFloat(val).toFixed(this.options['centsLimit']);
  // }

  // private init() {
  //   this.opt = new PriceFormatOptions(this.options);
  //   this.options = this.opt.getOptions();
  //   this.formatter = new PriceFormatTransformer(this.options);
  // }

  getValidateFn(): ValidatorFn {
    return PriceFormatValidator(this.options['minValue'], this.options['maxValue'], this.options['allowNegative']);
  }

  getValidators(): ValidatorFn | ValidatorFn[] {
    return [this.getValidateFn()];
  }
  getErrorMessage(): string {
    return '';
  };
  getTranslations(): TranslationObject {
    return {};
  }
  getOutput(data: string): string {
    return data;
  };
}
