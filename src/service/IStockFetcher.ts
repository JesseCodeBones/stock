import {Stock} from "../beans/Stock";
import {MarketData} from "../beans/MarketData";
import {FetcherReport} from "../beans/FetcherReport";

export interface IStockFetcher {

    fit(stockName:Stock, marketData:MarketData):boolean;
    store(stock:Stock);
    clear();
    report():FetcherReport;
}