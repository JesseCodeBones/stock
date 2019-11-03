import { IStockServiceImpl } from "../impl/IStockServiceImpl";
export class StockServiceFactory {
    static getInstance(type) {
        return new IStockServiceImpl();
    }
}
//# sourceMappingURL=StockServiceFactory.js.map