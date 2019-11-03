"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IStockServiceImpl_1 = require("../impl/IStockServiceImpl");
var StockServiceFactory = /** @class */ (function () {
    function StockServiceFactory() {
    }
    StockServiceFactory.getInstance = function (type) {
        return new IStockServiceImpl_1.IStockServiceImpl();
    };
    return StockServiceFactory;
}());
exports.StockServiceFactory = StockServiceFactory;
//# sourceMappingURL=StockServiceFactory.js.map