
// @ts-ignore
let ChainTaskRunner = require('./ChainTaskRunner');

export class PatchRunnerHelper {

    static _instance:object;

    static getTaskChainRunner():object{
        if (!this._instance) {
            this._instance = new ChainTaskRunner();
        }
        return this._instance;
    }
}