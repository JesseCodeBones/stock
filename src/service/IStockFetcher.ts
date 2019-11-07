import {Stock} from "../beans/Stock";
import {MarketData} from "../beans/MarketData";

export interface IStockFetcher {

    fit(stockName:Stock, marketData:MarketData):boolean;
    getDBLocation():string;
}