import { IStockServiceImpl } from "../impl/IStockServiceImpl";
export class StockServiceFactory {
    static getInstance(type) {
        if (this.instance == null) {
            this.instance = new IStockServiceImpl();
        }
        return this.instance;
    }
}
//# sourceMappingURL=StockServiceFactory.js.map