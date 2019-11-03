import {View_index_tasks} from "./view_index_tasks.js"
import {IViewUpdater} from "./IViewUpdater.js";
let $: JQueryStatic = (window as any)["jQuery"];
export class View_index implements IViewUpdater{
    getJobs():View_index_tasks[]{
        return[
            new View_index_tasks("股票名称更新","股票名称更新",1,"未开始"),
            new View_index_tasks("股票分析","股票分析",1,"未开始")
        ];
    }

    _triggerJob(task:View_index_tasks){
        console.log(task.desc);
    }

    _updateJobs(){
        let jobs = this.getJobs();
        for (let job of jobs){
            let UIElement = $(`<tr>
                                        <td>${job.name}</td>
                                        <td>${job.desc}</td>
                                        <td><button>trigger</button></td>
                                        <td><div class="status"></div></td>
                                    </tr>`);
            UIElement.find("button").on("click", (event)=>{
                this._triggerJob(job);
            });
            UIElement.appendTo($(".dash-board"))
        }
    }

    updateUI() {
        this._updateJobs();
    }

    private static instance:View_index;

    static getInstance():View_index{
        if (!View_index.instance) {
            View_index.instance = new View_index();
        }
        return View_index.instance;
    }
}