import {IStockService} from "../IStockService";
import {Stock} from "../../beans/Stock";

export class IStockServiceImpl implements IStockService{
    fetchStockName(): Stock[] {
        console.log('inter here');
        return [];
    }

}