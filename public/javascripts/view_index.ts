import {View_index_tasks} from "./view_index_tasks.js"
import {IViewUpdater} from "./IViewUpdater.js";
let $: JQueryStatic = (window as any)["jQuery"];
export class View_index implements IViewUpdater{
    getJobs():View_index_tasks[]{
        // let fetchStockTask = new View_index_tasks("股票名称更新",
        //     "股票名称更新",
        //     1,
        //     "未开始",
        //     "/updateStockName");
        // fetchStockTask.statusCheckUrl = "/updateStockName_status";


        let duotoupailie = new View_index_tasks("多头排列",
            "多头排列",
            1,
            "未开始",
            "/duotou_fetch");
        duotoupailie.statusCheckUrl = "/duotou_fetch_status";
        duotoupailie.reportUrl = "/duotou_fetch_report";

        return[
            duotoupailie
        ];
    }

    _triggerJob(task:View_index_tasks){
        $.get(task.triggerUrl, (result)=>{
           window.alert("done");
        });
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
            if (job.statusCheckUrl != null) {
                setInterval(()=>{
                    $.get(job.statusCheckUrl, (result)=>{
                        if (result["status"]){
                            UIElement.find(".status")
                                .addClass("running");
                        } else {
                            UIElement.find(".status")
                                .removeClass("running");
                        }
                    })
                }, 2500);
            }
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