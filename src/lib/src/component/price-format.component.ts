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
import { BasePriceFormatComponent } from '../reusable/base-price-format.component';

@Component({
  selector: 'price-format',
  templateUrl: './price-format.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PriceFormatComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PriceFormatComponent), multi: true }
  ]
})
export class PriceFormatComponent extends BasePriceFormatComponent {}
