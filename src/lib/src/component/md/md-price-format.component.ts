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

@Component({
  selector: 'md-price-format',
  templateUrl: './md-price-format.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MdPriceFormatComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MdPriceFormatComponent), multi: true }
  ]
})
export class MdPriceFormatComponent extends BasePriceFormatComponent {}
