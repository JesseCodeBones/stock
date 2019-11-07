import {IFetchService} from "../IFetchService";
import {GeneralFetchService} from "../impl/GeneralFetchService";

export class FetchServiceFactory {

    static instance:IFetchService;

    static getFetchService(type:number):IFetchService{

        if (!this.instance) {
            this.instance = new GeneralFetchService();
        }
        return this.instance;
    }
}