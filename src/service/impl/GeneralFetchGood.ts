import {IFetchGood} from "../IFetchGood";
import {HttpContentHelper} from "../util/HttpContentHelper";
import {PatchRunnerHelper} from "../util/PatchRunnerHelper";

// @ts-ignore
const jsonfile = require("jsonfile");
// @ts-ignore
const ChainTask = require('task-chain').ChainTask;
export class GeneralFetchGood implements IFetchGood{

    // @ts-ignore
    private static STOCKS_DB:string = __dirname + "/../../../db/stocks.json";
    // @ts-ignore
    private static GOOD_DB:string = __dirname + "/../../../db/good.json";
    fetch() {

        let stocks:string[] = jsonfile.readFileSync(GeneralFetchGood.STOCKS_DB);

        stocks.forEach(stock=>{

            let task = new ChainTask(function(){
                let url ='http://emweb.securities.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?ctype=4&type=0&code='+stock;

                HttpContentHelper.getHttpRequest(url).then(body=>{
                    console.log(body);

                    let response:any =JSON.parse(body);
                    if (response && response.length > 4) {
                        let current:object = response[0];
                        let previous:object = response[3];
                        if (Number(current['mgjyxjl']) > 0) {
                            if (Number(current['zcfzl']) < 60) {
                                if (Number(current['mgjyxjl']) / Number(previous['mgjyxjl']) > 1.1) {
                                    stocks = jsonfile.readFileSync(GeneralFetchGood.GOOD_DB);
                                    stocks.push(stock);
                                    jsonfile.writeFileSync(GeneralFetchGood.GOOD_DB, stocks);
                                }
                            }
                        }
                    }

                    task.end();
                }).catch(reason => {
                    task.end();
                });
            });
            // @ts-ignore
            PatchRunnerHelper.getTaskChainRunner().addTask(task);
        });
    }
}