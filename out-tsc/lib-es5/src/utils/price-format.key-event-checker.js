"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PriceFormatKeyEventChecker = (function () {
    /**
     * @param {?} options
     */
    function PriceFormatKeyEventChecker(options) {
        this.options = {};
        this.updateOptions(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    PriceFormatKeyEventChecker.prototype.updateOptions = function (options) {
        this.options = options;
    };
    return PriceFormatKeyEventChecker;
}());
exports.PriceFormatKeyEventChecker = PriceFormatKeyEventChecker;
function PriceFormatKeyEventChecker_tsickle_Closure_declarations() {
    /** @type {?} */
    PriceFormatKeyEventChecker.prototype.options;
}
