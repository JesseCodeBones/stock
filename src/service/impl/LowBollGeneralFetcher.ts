import {IStockFetcher} from "../IStockFetcher";
import {Stock} from "../../beans/Stock";
import {FetcherReport} from "../../beans/FetcherReport";
import {MarketData} from "../../beans/MarketData";
// @ts-ignore
const jsonfile = require("jsonfile");

export class LowBollGeneralFetcher implements IStockFetcher{
    private static instance:LowBollGeneralFetcher;

    // @ts-ignore
    private static PATH:string = __dirname + "/../../../db/fetchers/duotou.json";
    private static fetchDate: string;

    static generateInstance():LowBollGeneralFetcher{
        if (!LowBollGeneralFetcher.instance) {
            LowBollGeneralFetcher.instance = new LowBollGeneralFetcher();
        }
        return LowBollGeneralFetcher.instance;
    }

    clear() {
        jsonfile.writeFileSync(LowBollGeneralFetcher.PATH, []);
        let d = new Date();
        LowBollGeneralFetcher.fetchDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    }

    fit(stockName: Stock, marketData: MarketData): boolean {


        return false;
    }

    report(): FetcherReport {
        let report = new FetcherReport();
        report.title="股价出现在BOLL线下轨一下";
        let existedStocks:Stock[] = jsonfile.readFileSync(LowBollGeneralFetcher.PATH);
        report.result = existedStocks;
        if (!LowBollGeneralFetcher.fetchDate) {
            let d = new Date();
            LowBollGeneralFetcher.fetchDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
        }
        report.date = LowBollGeneralFetcher.fetchDate;
        return report;
    }

    store(stock: Stock) {
        let existedStocks:Stock[] = jsonfile.readFileSync(LowBollGeneralFetcher.PATH);
        existedStocks.push(stock);
        jsonfile.writeFileSync(LowBollGeneralFetcher.PATH, existedStocks);
    }


}