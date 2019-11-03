import {View_index_tasks} from "./view_index_tasks.js"
import {IViewUpdater} from "./IViewUpdater.js";
export class View_index implements IViewUpdater{
    getJobs():View_index_tasks[]{
        return[
            new View_index_tasks("股票名称更新","股票名称更新",1,"未开始")
        ];
    }

    updateUI() {
        let jobs = this.getJobs();
        for (let job of jobs){
            console.log("get UI Update successfully");
        }
    }

    private static instance:View_index;

    static getInstance():View_index{
        if (!View_index.instance) {
            View_index.instance = new View_index();
        }
        return View_index.instance;
    }
}