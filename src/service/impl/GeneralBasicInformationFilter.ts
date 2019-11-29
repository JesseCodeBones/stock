import {IBasicInformationFilter} from "../IBasicInformationFilter";
import {Stock} from "../../beans/Stock";
import {HttpContentHelper} from "../util/HttpContentHelper";

export class GeneralBasicInformationFilter implements IBasicInformationFilter{
    async isBasicInformationOK(stock: Stock, price:number): Promise<boolean> {
        let url = `http://emweb.securities.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?ctype=4&type=0&code=${stock.name}`;
        try {
            let body:string = await HttpContentHelper.getHttpRequest(url);
            let jsonData = JSON.parse(body);
            let latestCash = Number(jsonData[0]['mgjyxjl']);
            if (latestCash / price >= 0.025) {
                console.log(`stock${stock.name} with cache:${latestCash} - now price:${price}` );
                return new Promise(function (resolve, reject) {
                   resolve(true);
                });
            }
        } catch (e) {
            return new Promise(function (resolve, reject) {
                resolve(false);
            });
        }
        return new Promise(function (resolve, reject) {
            resolve(false);
        });
    }

}