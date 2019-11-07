import {IStockFetcher} from "./IStockFetcher";

export interface IFetchService {

    addFetcher(fetcher:IStockFetcher);
    deleteFetcher(fetcher:IStockFetcher);
    fetch();
}