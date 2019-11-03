
export class View_index_tasks {
    name:string;
    desc:string;
    execute_type:number;
    result:string;

    constructor(name: string, desc: string, execute_type: number, result: string) {
        this.name = name;
        this.desc = desc;
        this.execute_type = execute_type;
        this.result = result;
    }
}