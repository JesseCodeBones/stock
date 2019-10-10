import {Stock} from "../bean/Stock";

export interface IStockFetcherService {

    fetch();
    extractStocks():Stock[];
    status():boolean;
}