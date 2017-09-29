/* Angular modules */
import {
  AfterViewChecked,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';

/* Own modules */
import { BasePriceFormatComponent } from '../base-price-format.component';

// TODO send this interface to own file and export it
 
interface ErrorMapping {
  priceFormatNegativeError?: string,
  priceFormatMinValueError?: string,
  priceFormatMaxValueError?: string
};

@Component({
  selector: 'md-price-format',
  templateUrl: './md-price-format.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MdPriceFormatComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MdPriceFormatComponent), multi: true }
  ]
})
export class MdPriceFormatComponent extends BasePriceFormatComponent implements OnInit {
  @Input() control: FormControl;
  @Input() errorMapping: ErrorMapping = {
    priceFormatNegativeError: 'Doesn\'t insert a negative price.',
    priceFormatMinValueError: 'Insert a price more than or equal to ${minPrice}',
    priceFormatMaxValueError: 'Insert a price less than or equal to ${maxPrice}',
  };
  public error = '';
  
  ngOnInit() {
    const self = this;
    this.control.valueChanges.subscribe(data => {
      self._date = data;
    });
    this.control.statusChanges.subscribe(status => {
      if (status === 'VALID' || !Object.keys(self.control.errors || {}).length) {
        self.error = '';
        return;
      }
      const firstError = Object.keys(self.control.errors)[0];
      if (firstError === 'priceFormatMinValueError') {
        self.error = self.errorMapping[firstError].replace('${minPrice}', self.options.minValue);
      } else if (firstError === 'priceFormatMaxValueError') {
        self.error = self.errorMapping[firstError].replace('${maxPrice}', self.options.maxValue);
      } else {
        self.error = self.errorMapping[firstError];
      }
    });
  }
}
