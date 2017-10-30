/* Angular modules */
import { forwardRef }                      from '@angular/core';
import { ComponentFixture, TestBed }                     from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/* Own modules */
import { PriceFormatComponent } from './price-format.component';
import { PriceFormatOptions } from '../utils/price-format.options';
import { PriceFormatOptionsMock } from '../mock/price-format.options.mock';
import { PriceFormatTransformer } from '../utils/price-format.transformer';
import { PriceFormatTransformerMock } from '../mock/price-format.transformer.mock';
import { PriceFormatValidator } from '../validator/price-format.validator';
import { PriceFormatValidatorMock } from '../mock/price-format.validator.mock';


describe('PriceFormatComponent', () => {
  let comp: PriceFormatComponent;
  let fixture: ComponentFixture<PriceFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PriceFormatComponent],
      providers: [
        { provide: PriceFormatOptions, useClass: PriceFormatOptionsMock },
        { provide: PriceFormatValidator, useClass: PriceFormatValidatorMock },
        { provide: PriceFormatTransformer, useClass: PriceFormatTransformerMock },
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PriceFormatComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PriceFormatComponent), multi: true }
      ]
    });

    fixture = TestBed.createComponent(PriceFormatComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should key events accepting number', () => {
    let e: any;

    e = {
      keyCode: 49 // keyCode to '1' upside 'q'
    };

    comp.handleKeyboardKeyDown(e);
    expect(comp.price).toEqual(NaN); // NaN on init, is it ok?

    comp._price = 'R$ 0,01';
    comp.handleKeyboardKeyUp(e);
    expect(comp.price).toEqual(0.01);

    comp.handleKeyboardKeyDown(e);
    expect(comp.price).toEqual(0.01);

    comp._price = 'R$ 0,11';
    comp.handleKeyboardKeyUp(e);
    expect(comp.price).toEqual(0.11);

    /* TEST WITH BACKSPACE AHEAD */

    e = {
      keyCode: 8 // keyCode to backspace
    };

    comp.handleKeyboardKeyDown(e);
    expect(comp.price).toEqual(0.11);

    comp._price = 'R$ 0.01';
    comp.handleKeyboardKeyUp(e);
    expect(comp.price).toEqual(0.01);
  });

  it('should focus events working correctly', () => {
    fixture.detectChanges();

    expect(comp._price).toEqual('R$ 0.00');

    expect(comp.focusOn).toBe(true);
    comp.focusOutEvent();

    expect(comp._price).not.toEqual('R$ 0.00');

    expect(comp.focusOn).toBe(false);
    comp.focusInEvent();

    expect(comp._price).toEqual('R$ 0.00');

    expect(comp.focusOn).toBe(true);
    comp.focusOutEvent();

    expect(comp._price).not.toEqual('R$ 0.00');

    expect(comp.focusOn).toBe(false);
  });

  it('invalid values is not accepted', () => {
    const newInvalidPrice = undefined;

    comp.price = newInvalidPrice;

    fixture.detectChanges();

    expect(comp.price).not.toEqual(newInvalidPrice);
    expect(comp.price).toEqual(0);

    const asasa = 'asa';

    comp.price = asasa;

    fixture.detectChanges();

    expect(comp.price).not.toEqual(asasa);
    expect(+comp.price).toEqual(0);
  });

  it('should valid number value propertly set', () => {
    const newPriceInt = 1;

    comp.price = newPriceInt;

    expect(comp.price).toEqual(newPriceInt / 100);

    const newPriceDec = 0.01;

    comp.price = newPriceDec;

    expect(comp.price).toEqual(newPriceDec);
  });

  it('should valid string value propertly set', () => {
    const newPriceInt = '1';

    comp.price = newPriceInt;

    expect(+comp.price).toEqual(0.01);

    const newPriceDec = '0.01';

    comp.price = newPriceDec;

    expect(+comp.price).toEqual(0.01);
  });

});
