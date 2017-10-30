/* Own modules */
import { PriceFormatOptions } from './price-format.options';

export class PriceFormatTransformer {
  maxSize = 16;
  options = {};

  constructor(options: any) {
    const t = new PriceFormatOptions(options);
    options = t.getOptions();
    this.updateOptions(options);
  }

  public addPrefix(price: string) {
    return this.change(this.options['prefix'] + price);
  }

  public addSuffix(price: string) {
    return this.change(price + this.options['suffix']);
  }

  public change(newValue: string) {
    let temp = this.getCleanValue(newValue);
    if (temp.length > this.maxSize) {
      temp = temp.substr(0, this.maxSize);
      newValue = this.priceFormat(temp);
      console.log('this number reached the maximum size. This number will be truncated to: ' + newValue);
    }
    return newValue;
  }

  public clearPrefix(price: string) {
    if (this.trim(this.options['prefix']) !== '' && this.options['clearPrefix']) {
      const array = price.split(this.options['prefix']);
      return this.change(array[1]);
    }
    return price;
  }

  public clearSuffix(price: string) {
    if (this.trim(this.options['suffix']) !== '' && this.options['clearSuffix']) {
      const array = price.split(this.options['suffix']);
      return this.change(array[0]);
    }
    return price;
  }

  public getCleanValue(newValue: string): string {
    let temp = newValue;
    temp = temp.split(this.options['prefix']).join('');
    temp = temp.split(this.options['suffix']).join('');
    temp = temp.split(this.options['thousandsSeparator']).join('');
    temp = temp.split(this.options['centsSeparator']).join('');
    return temp;
  }

  public priceFormatNumber(num: number) {
    return this.priceFormat(num.toFixed(this.options['centsLimit']));
  }

  public priceFormat(str: string) {
    const temp = this.toNumbers(str);
    let formatted = this.fillWithZeroes(temp);
    let thousandsFormatted = '';
    let thousandsCount = 0;
    let centsVal = formatted.substr(formatted.length - this.options['centsLimit'], this.options['centsLimit']);
    const integerVal = formatted.substr(0, formatted.length - this.options['centsLimit']);
    if (this.options['centsLimit'] === 0) {
      this.options['centsSeparator'] = '';
      centsVal = '';
    }

    formatted = (this.options['centsLimit'] === 0) ? integerVal : integerVal + this.options['centsSeparator'] + centsVal;
    if (this.options['thousandsSeparator'] || this.trim(this.options['thousandsSeparator']) !== '') {
      for (let j = integerVal.length; j > 0; j--) {
        let char_ = integerVal.substr(j - 1, 1);
        thousandsCount++;
        if (thousandsCount % 3 === 0) { char_ = this.options['thousandsSeparator'] + char_; }
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
      } else {
        if (!this.options['insertPlusSign']) {
          formatted = '' + formatted;
        } else {
          formatted = '+' + formatted;
        }
      }
    }

    if (this.options['prefix']) { formatted = this.options['prefix'] + formatted; }
    if (this.options['suffix']) { formatted = formatted + this.options['suffix']; }
    return formatted;
  }

  public toNumber(price: string): number {
    price = this.getCleanValue(price);
    const pow = Math.pow(10, parseInt(this.options['centsLimit'], 10));
    const v = parseFloat(price);
    const div = v / pow;
    return parseFloat(div.toString());
  }

  public updateOptions(options: any) {
    this.options = options;
  }

  private fillWithZeroes(str: string) {
    const limit = parseInt(this.options['centsLimit'], 10) + 1;
    while (str.length < limit) { str = '0' + str; }
    return str;
  }

  private toNumbers(str: string) {
    let formatted = '';
    for (let i = 0; i < (str.length); i++) {
      let char_ = str.charAt(i);
      if (formatted.length === 0 && char_ === '0') { continue; }
      if (char_ && char_.match(/[0-9]/)) {
        if (this.options['limit']) {
          if (formatted.length < this.options['limit']) {
            formatted = formatted + char_;
          }
        } else {
          formatted = formatted + char_;
        }
      }
    }

    return formatted;
  }

  private trim(str: String) {
    if (typeof str !== 'string') { return str; }
    return str.replace(/^\s+|\s+$/g, '');
  }
}
