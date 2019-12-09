import {Stock} from "../beans/Stock";
import {MarketData} from "../beans/MarketData";
import {FetcherReport} from "../beans/FetcherReport";

export interface IStockFetcher {

    fit(stockName:Stock, marketData:Array<Array<any>>):boolean;
    store(stock:Stock);
    clear();
    report():FetcherReport;
}