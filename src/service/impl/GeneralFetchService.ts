import {IFetchService} from "../IFetchService";
import {IStockFetcher} from "../IStockFetcher";

export class GeneralFetchService implements IFetchService{
    private fetchers = new Array<IStockFetcher>();

    addFetcher(fetcher: IStockFetcher) {
        this.fetchers.push(fetcher);
    }

    fetch() {
        //TODO loop all stock
        //TODO fetch all market data
        //TODO test with fetcher and store data
    }

    deleteFetcher(fetcher: IStockFetcher) {
        const index = this.fetchers.indexOf(fetcher, 0);
        if (index > -1) {
            this.fetchers.splice(index, 1);
        }
    }

}