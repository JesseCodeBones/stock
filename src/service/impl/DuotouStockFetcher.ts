import {IStockFetcher} from "../IStockFetcher";
import {Stock} from "../../beans/Stock";
import {MarketData} from "../../beans/MarketData";
import {FetcherReport} from "../../beans/FetcherReport";
// @ts-ignore
const jsonfile = require("jsonfile");

export class DuotouStockFetcher implements IStockFetcher{
    private static instance:DuotouStockFetcher;
    // @ts-ignore
    private static PATH:string = __dirname + "/../../../db/fetchers/duotou.json";
    private static fetchDate:string;

    static generateInstance():DuotouStockFetcher{
        if (!DuotouStockFetcher.instance) {
            DuotouStockFetcher.instance = new DuotouStockFetcher();
        }
        return DuotouStockFetcher.instance;
    }

    clear() {
        jsonfile.writeFileSync(DuotouStockFetcher.PATH, []);
        let d = new Date();
        DuotouStockFetcher.fetchDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    }

    fit(stockName: Stock, marketData: Array<Array<any>>): boolean {

        //7天内存在一天13天线是向上的
        let firstCondition:boolean = false;
        for (let i of [0, 1, 2, 3, 4, 5, 6]){
            if (marketData[i][9] >= marketData[i+1][9]) {
                console.log('condition1');
                firstCondition = true;
            }
        }

        //当前股价小于13天均线
        let secondCondition:boolean = false;
        console.log('close:'+marketData[0][2]);
        if (marketData[0][2] < marketData[0][9]) {
            console.log('condition2');
            secondCondition = true;
        }

        //股价严重偏离144趋势线
        let thirdCondition: boolean = false;

        if (marketData[0][9] < marketData[0][12]) {

            let cha:number = marketData[0][12] - marketData[0][9];
            cha = cha / marketData[0][9];
            if (cha > 0.15) {
                console.log('condition3');
                thirdCondition = true;
            }
        }

        if (firstCondition && secondCondition && thirdCondition) {
            return true;
        }

        return false;
    }

    store(stock: Stock) {
        let existedStocks:Stock[] = jsonfile.readFileSync(DuotouStockFetcher.PATH);
        existedStocks.push(stock);
        jsonfile.writeFileSync(DuotouStockFetcher.PATH, existedStocks);
    }

    report(): FetcherReport {

        let report = new FetcherReport();
        report.title="13天线出现拐头，但是股价有打回13天以下";
        let existedStocks:Stock[] = jsonfile.readFileSync(DuotouStockFetcher.PATH);
        report.result = existedStocks;
        if (!DuotouStockFetcher.fetchDate) {
            let d = new Date();
            DuotouStockFetcher.fetchDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
        }
        report.date = DuotouStockFetcher.fetchDate;
        return report;
    }
}