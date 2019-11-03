"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stock = /** @class */ (function () {
    function Stock(name) {
        this._name = name;
    }
    Object.defineProperty(Stock.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Stock;
}());
exports.Stock = Stock;
//# sourceMappingURL=Stock.js.map