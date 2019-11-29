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

        //5天内存在一天13天线是向上的
        let firstCondition:boolean = false;
        for (let i of [0, 1, 2, 3, 4]){
            if (marketData['mashData'][i]['ma13'] >= marketData['mashData'][i+1]['ma13']) {
                console.log('********************* got one ***********'+stockName.name);
                firstCondition = true;
            }
        }

        //当前股价小于13天均线
        let secondCondition:boolean = false;
        console.log('close:'+marketData['mashData'][0]['kline']['close']);
        if (marketData['mashData'][0]['kline']['close'] < marketData['mashData'][0]['ma13']) {
            console.log('********************* got two ***********'+stockName.name);
            secondCondition = true;
        }

        //股价严重偏离144趋势线
        let thirdCondition: boolean = false;

        if (marketData['mashData'][0]['ma13'] < marketData['mashData'][0]['ma144']) {

            let cha:number = marketData['mashData'][0]['ma144'] - marketData['mashData'][0]['ma13'];
            cha = cha / marketData['mashData'][0]['ma13'];
            if (cha > 0.15) {
                console.log('********************* got three ***********'+stockName.name);
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
}