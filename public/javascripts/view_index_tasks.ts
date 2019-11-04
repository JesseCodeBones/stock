
export class View_index_tasks {
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

    constructor(name: string, desc: string, execute_type: number, result: string, triggerUrl:string) {
        this.name = name;
        this.desc = desc;
        this.execute_type = execute_type;
        this.result = result;
        this.triggerUrl = triggerUrl;
    }

}