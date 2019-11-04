import {IStockService} from "../IStockService";
import {Stock} from "../../beans/Stock";
import {IStatusable} from "../IStatusable";
import {IStorable} from "../IStorable";
import {HttpContentHelper} from "../util/HttpContentHelper";
// @ts-ignore
const jsonfile = require("jsonfile");

export class IStockServiceImpl implements IStockService, IStatusable, IStorable{

    status:boolean=false;
    // @ts-ignore
    STORE_FILE_PATH:string = __dirname + "/../../../db/stocks.json";

    _getUsefulObj(body:string, sep:string):object{
        let substr = body.substr(body.indexOf(sep),
            body.length-body.indexOf(sep));
        let substr1 = substr.substr(substr.indexOf("("), substr.length-substr.indexOf("("));
        let substring = substr1.substring(1, substr1.length-2);
        let obj = JSON.parse(substring);
        return obj;
    }

    async getAllStockNumber():Promise<number> {
        let kLineURL = `http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,0,1,100]]&callback=stockAnalysis`;
        let result = await HttpContentHelper.getHttpRequest(kLineURL);
        let obj = this._getUsefulObj(result, "stockAnalysis");
        return new Promise<number>(((resolve, reject) => {
            resolve(obj[0]["count"]);
        }));
    }
    async fetchStockNameWithPage(url:string){
        let result = await HttpContentHelper.getHttpRequest(url);
        let obj = this._getUsefulObj(result, "stockAnalysis");
        let stocks = [];
        // @ts-ignore
        stocks = jsonfile.readFileSync(__dirname+'/stocks.json');
        obj[0].items.forEach((item)=>{
            stocks.push(item[0]);
        });
        jsonfile.writeFileSync(this.STORE_FILE_PATH, stocks);
    }

    async fetchStockName() {
        jsonfile.writeFileSync(this.STORE_FILE_PATH, []);
        let allStockNumber = await this.getAllStockNumber();
        let maxPage = allStockNumber/80 + 1;
        for(let i = 0; i< maxPage; i++){
            let URL = `http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,${i},${i+1},80]]&callback=stockAnalysis`;
            await this.fetchStockNameWithPage(URL);
        }
    }



    isRunning(): boolean {
        return this.status;
    }

    store(): boolean {
        return false;
    }

}