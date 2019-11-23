import {IStockFetcher} from "../IStockFetcher";
import {Stock} from "../../beans/Stock";
import {MarketData} from "../../beans/MarketData";
// @ts-ignore
const jsonfile = require("jsonfile");

export class DuotouStockFetcher implements IStockFetcher{
    private static instance:DuotouStockFetcher;
    // @ts-ignore
    private static PATH:string = __dirname + "/../../../db/fetchers/duotou.json";

    static generateInstance():DuotouStockFetcher{
        if (!DuotouStockFetcher.instance) {
            DuotouStockFetcher.instance = new DuotouStockFetcher();
        }
        return DuotouStockFetcher.instance;
    }

    clear() {
        jsonfile.writeFileSync(DuotouStockFetcher.PATH, []);
    }

    fit(stockName: Stock, marketData: MarketData): boolean {
        console.log(stockName.name);
        return false;
    }

    store(stock: Stock) {
        let existedStocks:Stock[] = jsonfile.readFileSync(DuotouStockFetcher.PATH);
        existedStocks.push(stock);
        jsonfile.writeFileSync(DuotouStockFetcher.PATH, existedStocks);
    }
}