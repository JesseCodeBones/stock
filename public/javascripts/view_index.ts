import {View_index_tasks} from "./view_index_tasks.js"
export class View_index {
    static getJobs():View_index_tasks[]{
        return[
            new View_index_tasks("股票名称更新","股票名称更新",1,"未开始")
        ];
    }
}