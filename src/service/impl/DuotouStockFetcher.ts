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

        if (marketData['mashData'][0]['ma13'] >= marketData['mashData'][0]['ma34']) {
            if (marketData['mashData'][0]['ma34'] >= marketData['mashData'][0]['ma55']) {
                if (marketData['mashData'][0]['ma55'] >= marketData['mashData'][0]['ma144']) {

                    console.log(`${marketData['mashData'][0]['ma13']} - ${marketData['mashData'][0]['ma34']} - ${marketData['mashData'][0]['ma55']} - ${marketData['mashData'][0]['ma144']}`);

                    return true;
                }
            }
        }

        // if (marketData['mashData'][0]['ma13'] >= marketData['mashData'][4]['ma13'] ) {//13天线趋于平稳
        //     if (marketData['mashData'][0]['ma13'] > marketData['mashData'][0]['close']) {
        //         let cha = marketData['mashData'][0]['ma13'] - marketData['mashData'][0]['close'];
        //         if (cha / marketData['mashData'][0]['close'] > 0.03) {
        //             console.log(`found the stock${stockName.name}`);
        //             return true;
        //         }
        //     }
        // }

        return false;
    }

    store(stock: Stock) {
        let existedStocks:Stock[] = jsonfile.readFileSync(DuotouStockFetcher.PATH);
        existedStocks.push(stock);
        jsonfile.writeFileSync(DuotouStockFetcher.PATH, existedStocks);
    }
}