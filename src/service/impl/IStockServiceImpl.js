var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpContentHelper } from "../util/HttpContentHelper";
// @ts-ignore
const jsonfile = require("jsonfile");
export class IStockServiceImpl {
    constructor() {
        this.status = false;
        // @ts-ignore
        this.STORE_FILE_PATH = __dirname + "/../../../db/stocks.json";
    }
    _getUsefulObj(body, sep) {
        let substr = body.substr(body.indexOf(sep), body.length - body.indexOf(sep));
        let substr1 = substr.substr(substr.indexOf("("), substr.length - substr.indexOf("("));
        let substring = substr1.substring(1, substr1.length - 2);
        let obj = JSON.parse(substring);
        return obj;
    }
    getAllStockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            let kLineURL = `http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,0,1,100]]&callback=stockAnalysis`;
            let result = yield HttpContentHelper.getHttpRequest(kLineURL);
            let obj = this._getUsefulObj(result, "stockAnalysis");
            return new Promise(((resolve, reject) => {
                resolve(obj[0]["count"]);
            }));
        });
    }
    fetchStockNameWithPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield HttpContentHelper.getHttpRequest(url);
            let obj = this._getUsefulObj(result, "stockAnalysis");
            let stocks = [];
            // @ts-ignore
            stocks = jsonfile.readFileSync(__dirname + '/stocks.json');
            obj[0].items.forEach((item) => {
                stocks.push(item[0]);
            });
            jsonfile.writeFileSync(this.STORE_FILE_PATH, stocks);
        });
    }
    fetchStockName() {
        return __awaiter(this, void 0, void 0, function* () {
            jsonfile.writeFileSync(this.STORE_FILE_PATH, []);
            let allStockNumber = yield this.getAllStockNumber();
            let maxPage = allStockNumber / 80 + 1;
            for (let i = 0; i < maxPage; i++) {
                let URL = `http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,${i},${i + 1},80]]&callback=stockAnalysis`;
                yield this.fetchStockNameWithPage(URL);
            }
        });
    }
    isRunning() {
        return this.status;
    }
    store() {
        return false;
    }
}
//# sourceMappingURL=IStockServiceImpl.js.map