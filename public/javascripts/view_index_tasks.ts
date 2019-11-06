
export class View_index_tasks {
    set reportUrl(value: string) {
        this._reportUrl = value;
    }
    get reportUrl(): string {
        return this._reportUrl;
    }
    get statusCheckUrl(): string {
        return this._statusCheckUrl;
    }
    set statusCheckUrl(value: string) {
        this._statusCheckUrl = value;
    }
    name:string;
    desc:string;
    execute_type:number;
    result:string;
    triggerUrl:string;
    private _statusCheckUrl:string;
    private _reportUrl:string;

    constructor(name: string, desc: string, execute_type: number, result: string, triggerUrl:string) {
        this.name = name;
        this.desc = desc;
        this.execute_type = execute_type;
        this.result = result;
        this.triggerUrl = triggerUrl;
    }

}