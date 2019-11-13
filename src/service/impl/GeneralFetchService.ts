import {IFetchService} from "../IFetchService";
import {IStockFetcher} from "../IStockFetcher";
import {HttpContentHelper} from "../util/HttpContentHelper";
import {CalculateHelper} from "../util/CalculateHelper";
import {Stock} from "../../beans/Stock";
import {PatchRunnerHelper} from "../util/PatchRunnerHelper";
// @ts-ignore
const jsonfile = require("jsonfile");
// @ts-ignore
const ChainTask = require("ChainTask");
export class GeneralFetchService implements IFetchService{
    private fetchers = new Array<IStockFetcher>();
    // @ts-ignore
    private _STOCKS_DB_ADDR:string = __dirname + "/../../../db/stocks.json";

    addFetcher(fetcher: IStockFetcher) {
        this.fetchers.push(fetcher);
    }

    async fetch() {
        let stocks:string[] = jsonfile.readFileSync(this._STOCKS_DB_ADDR);
        //TODO clear all stored data of fetcher
        let now = new Date();
        // @ts-ignore
        let nowValue = Date.parse(now);
        stocks.forEach(async (stock) => {
            let fetchUrl: string = `https://gupiao.baidu.com/api/stocks/stockweekbar?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=${stock}&step=3&start=&count=160&fq_type=front&timestamp=${nowValue}`;
            let task = new ChainTask(()=>{
                HttpContentHelper.getHttpsRequest(fetchUrl).then((body)=>{
                    let bodyObj:object = JSON.parse(body);
                    bodyObj = CalculateHelper.generateFibonacci(bodyObj);
                    if (this.fetchers.length > 0) {
                        for (let fetcher of this.fetchers) {
                            let isFit = fetcher.fit(new Stock(stock), bodyObj);
                            if (isFit){
                                //TODO store
                            }
                        }
                    }
                    task.end();
                });
            });

            // @ts-ignore
            PatchRunnerHelper.getTaskChainRunner().addTask(task);
        });
    }

    deleteFetcher(fetcher: IStockFetcher) {
        const index = this.fetchers.indexOf(fetcher, 0);
        if (index > -1) {
            this.fetchers.splice(index, 1);
        }
    }

}