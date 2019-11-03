import {IStockService} from "../IStockService";
import {IStockServiceImpl} from "../impl/IStockServiceImpl";

export class StockServiceFactory {

    static getInstance(type:string):IStockService{
        return new IStockServiceImpl();
    }
}