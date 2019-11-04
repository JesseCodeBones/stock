import {IStockService} from "../IStockService";
import {IStockServiceImpl} from "../impl/IStockServiceImpl";

export class StockServiceFactory {

    static instance:IStockServiceImpl;

    static getInstance(type:string):IStockService{
        if (this.instance == null) {
            this.instance = new IStockServiceImpl();
        }
        return this.instance;
    }
}