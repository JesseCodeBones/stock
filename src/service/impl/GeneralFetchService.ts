import {IFetchService} from "../IFetchService";
import {IStockFetcher} from "../IStockFetcher";
import {HttpContentHelper} from "../util/HttpContentHelper";
import {CalculateHelper} from "../util/CalculateHelper";
import {Stock} from "../../beans/Stock";
import {PatchRunnerHelper} from "../util/PatchRunnerHelper";
import {IBasicInformationFilter} from "../IBasicInformationFilter";
import {GeneralBasicInformationFilter} from "./GeneralBasicInformationFilter";
// @ts-ignore
const jsonfile = require("jsonfile");
// @ts-ignore
const ChainTask = require('task-chain').ChainTask;
export class GeneralFetchService implements IFetchService{
    private fetchers = new Array<IStockFetcher>();
    // @ts-ignore
    private _STOCKS_DB_ADDR:string = __dirname + "/../../../db/stocks.json";
    static status:boolean = false;

    addFetcher(fetcher: IStockFetcher) {
        this.fetchers.push(fetcher);
    }

    cleanFetcherData(){
        for (let fetcher of this.fetchers) {
            fetcher.clear();
        }
    }

    async fetch() {
        GeneralFetchService.status = true;
        let stocks:string[] = jsonfile.readFileSync(this._STOCKS_DB_ADDR);
        //TODO clear all stored data of fetcher
        let now = new Date();
        // @ts-ignore
        let nowValue = Date.parse(now);
        this.cleanFetcherData();
        let basicInformationFilter:IBasicInformationFilter = new GeneralBasicInformationFilter();
        let that = this;
        let i:number = 0;
        let fetchUrl: string = `https://gupiao.baidu.com/api/stocks/stockdaybar?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=${stocks[i]}&step=3&start=&count=160&fq_type=front&timestamp=${nowValue}`;

        function createTask(){
            let task = new ChainTask(function(){

                function terminateOrNot(){

                    console.log(`fetching ${i+1} of ${stocks.length}`);

                    if (i < stocks.length) {
                        i++;
                        createTask();
                    } else {
                        GeneralFetchService.status = false;
                    }
                }

                HttpContentHelper.getHttpsRequest(fetchUrl).then((body)=>{
                    let bodyObj:object = JSON.parse(body);
                    bodyObj = CalculateHelper.generateFibonacci(bodyObj);
                    let price:number = bodyObj['mashData'][0]['kline']['close'];
                    let stockObj = new Stock(stocks[i]);
                    basicInformationFilter.isBasicInformationOK(stockObj, price).then(isGood=>{
                        if (isGood) {
                            if (that.fetchers.length > 0) {
                                for (let fetcher of that.fetchers) {
                                    let isFit = fetcher.fit(stockObj, bodyObj);
                                    if (isFit){
                                        fetcher.store(stockObj)
                                    }
                                }
                            }
                        }
                        terminateOrNot();
                        task.end();
                    }).catch(reason => {
                        terminateOrNot();
                        task.end();
                    });
                }).catch(reason => {
                    console.log(`task failed with reason: ${reason}`);
                    terminateOrNot();
                    task.end();
                });
            });
            // @ts-ignore
            PatchRunnerHelper.getTaskChainRunner().addTask(task);
        }

        createTask();
    }

    deleteFetcher(fetcher: IStockFetcher) {
        const index = this.fetchers.indexOf(fetcher, 0);
        if (index > -1) {
            this.fetchers.splice(index, 1);
        }
    }

}