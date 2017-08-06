"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular2_text_mask_1 = require("angular2-text-mask");
var price_format_component_1 = require("./component/price-format.component");
var PriceFormatModule = (function () {
    function PriceFormatModule() {
    }
    /**
     * @return {?}
     */
    PriceFormatModule.forRoot = function () {
        return {
            ngModule: PriceFormatModule,
            providers: []
        };
    };
    return PriceFormatModule;
}());
PriceFormatModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    angular2_text_mask_1.TextMaskModule
                ],
                declarations: [
                    price_format_component_1.PriceFormatComponent
                ],
                exports: [
                    price_format_component_1.PriceFormatComponent
                ],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
PriceFormatModule.ctorParameters = function () { return []; };
exports.PriceFormatModule = PriceFormatModule;
function PriceFormatModule_tsickle_Closure_declarations() {
    /** @type {?} */
    PriceFormatModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PriceFormatModule.ctorParameters;
}
