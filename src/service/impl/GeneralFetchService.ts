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
    private fetchers = new Set<IStockFetcher>();
    // @ts-ignore
    private _STOCKS_DB_ADDR:string = __dirname + "/../../../db/stocks.json";
    static status:boolean = false;
    addFetcher(fetcher: IStockFetcher) {
        this.fetchers.add(fetcher);
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
        let that = this;
        let basicInformationFilter:IBasicInformationFilter = new GeneralBasicInformationFilter();
        stocks.forEach(async (stock, index) => {
            let fetchingUrl:string = `http://flashdata2.jrj.com.cn/history/js/share/${stock.substring(2)}/other/dayk_ex.js?random=${nowValue}`;
            let task = new ChainTask(function(){
                HttpContentHelper.getHttpRequest(fetchingUrl).then((body)=>{

                    let jsonString:string = body.split("=")[1];
                    jsonString = jsonString.split('"factor"')[0].split('"hqs":')[1];
                    let jsonArr:Array<Array<any>> = JSON.parse(jsonString.substr(0, jsonString.length-3));

                    jsonArr = CalculateHelper.generateFibonacciNew(jsonArr);

                    let price:number = jsonArr[0][2];
                    let stockObj = new Stock(stock);
                    if (index == stocks.length - 1) {
                        GeneralFetchService.status = false;
                    }
                    basicInformationFilter.isBasicInformationOK(stockObj, price).then(isGood=>{
                        if (isGood) {
                            if (that.fetchers.size > 0) {
                                for (let fetcher of that.fetchers) {
                                    let isFit = fetcher.fit(stockObj, jsonArr);
                                    if (isFit){
                                        fetcher.store(stockObj)
                                    }
                                }
                            }
                        }
                        task.end();
                    }).catch(reason => {
                        task.end();
                    });
                }).catch(reason => {
                    console.log(`task failed with reason: ${reason}`);
                    task.end();
                });
            });

            // @ts-ignore
            PatchRunnerHelper.getTaskChainRunner().addTask(task);

        });
    }

    deleteFetcher(fetcher: IStockFetcher) {
        if (this.fetchers.has(fetcher)) {
            this.fetchers.delete(fetcher);
        }
    }

}