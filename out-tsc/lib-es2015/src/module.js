import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PriceFormatComponent } from './component/price-format.component';
export class PriceFormatModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: PriceFormatModule,
            providers: []
        };
    }
}
PriceFormatModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    TextMaskModule
                ],
                declarations: [
                    PriceFormatComponent
                ],
                exports: [
                    PriceFormatComponent
                ],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
PriceFormatModule.ctorParameters = () => [];
function PriceFormatModule_tsickle_Closure_declarations() {
    /** @type {?} */
    PriceFormatModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PriceFormatModule.ctorParameters;
}
