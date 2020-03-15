// @ts-ignore
let $: JQueryStatic = (window as any)["jQuery"];
export class view_dashboard {

    static generateBasicInformation(){

    }

    static registerEvent(){
        $(".tab").on("click", function(event){
            let target = $(this).attr("url");
            if (target) {
                window.location.href = target;
            }
        });
    }
}