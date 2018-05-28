export const PriceFormatOptionsDefaults = {
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

export class PriceFormatOptions {
  defaults = PriceFormatOptionsDefaults;

  current = {};
  options = {};

  constructor(options: any) {
    this.current = Object.assign(this.defaults, {});
    this.updateOptions(options);
  }

  public updateOptions(options: any) {
    this.options = Object.assign(this.defaults, options);
    if (isNaN(this.options['centsLimit']) || this.options['centsLimit'] < 0) {
      this.options['centsLimit'] = 2;
    }
    this.current = Object.assign(this.options, {});
  }

  public getOptions() {
    return this.options;
  }
}

export interface PriceFormatOptionsModel {
  minValue?: string;
  maxValue?: string;
  prefix?: string;
  suffix?: string;
  centsSeparator?: string;
  thousandsSeparator?: string;
  limit?: boolean;
  centsLimit?: number;
  clearPrefix?: boolean;
  clearSuffix?: boolean;
  allowNegative?: boolean;
  insertPlusSign?: boolean;
  cssclass?: string;
  placeholder?: string;
};
