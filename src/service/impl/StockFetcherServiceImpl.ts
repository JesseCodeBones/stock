import {Stock} from "../../bean/Stock";
import {IStockFetcherService} from "../IStockFetcherService";
import * as jsonfile from 'jsonfile';
import {HTTPRequestHelper} from "../../util/HTTPRequestHelper";

export class StockFetcherServiceImpl implements IStockFetcherService{
    private stocks:Stock[];
    private STOCKS_FILE_LOCATION = __dirname+'../../data/stocks.json';
    private workStatus:boolean = false;

    async fetch() {
        //init jsonfile
        jsonfile.writeFileSync(this.STOCKS_FILE_LOCATION, []);

        //first fetch for the total number of stock

        const initialURL = `http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,0,1,100]]&callback=analysisTitle`;
        let data = await HTTPRequestHelper.download(initialURL);
        let that = this;
        function analysisTitle(data){
            that.analysisData(data);
        }
        eval(data);
        return false;
    }

    async analysisData(data:object) {
        console.log(JSON.stringify(data));
    }

    extractStocks(): Stock[] {
        return this.stocks;
    }

    status(): boolean {
        return this.workStatus;
    }


}