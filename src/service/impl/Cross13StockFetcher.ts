import {IStockFetcher} from "../IStockFetcher";
import {Stock} from "../../beans/Stock";
import {FetcherReport} from "../../beans/FetcherReport";
// @ts-ignore
const jsonfile = require("jsonfile");

export class Cross13StockFetcher implements IStockFetcher{

    private static instance:Cross13StockFetcher;

    // @ts-ignore
    private static PATH:string = __dirname + "/../../../db/fetchers/cross.json";
    private static fetchDate:string;

    static generateInstance():Cross13StockFetcher{
        if (!Cross13StockFetcher.instance) {
            Cross13StockFetcher.instance = new Cross13StockFetcher();
        }
        return Cross13StockFetcher.instance;
    }


    clear() {
        jsonfile.writeFileSync(Cross13StockFetcher.PATH, []);
        let d = new Date();
        Cross13StockFetcher.fetchDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    }

    fit(stockName: Stock, marketData: Array<Array<any>>): boolean {
        if (marketData[0][2] > marketData[0][9] && marketData[0][3] < marketData[0][9]) {
            return true;
        }
        return false;
    }

    report(): FetcherReport {
        let report = new FetcherReport();
        report.title="上穿13天线，正式启动";
        let existedStocks:Stock[] = jsonfile.readFileSync(Cross13StockFetcher.PATH);
        report.result = existedStocks;
        if (!Cross13StockFetcher.fetchDate) {
            let d = new Date();
            Cross13StockFetcher.fetchDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
        }
        report.date = Cross13StockFetcher.fetchDate;
        return report;
    }

    store(stock: Stock) {
        let existedStocks:Stock[] = jsonfile.readFileSync(Cross13StockFetcher.PATH);
        existedStocks.push(stock);
        jsonfile.writeFileSync(Cross13StockFetcher.PATH, existedStocks);
    }

}