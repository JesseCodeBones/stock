import {Stock} from "../beans/Stock";

export interface IBasicInformationFilter {
    isBasicInformationOK(stock:Stock, price:number): Promise<boolean>;
}