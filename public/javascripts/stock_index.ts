// @ts-ignore
let $: JQueryStatic = (window as any)["jQuery"];
export class stock_index {
    static reports:string[] = ['reverse_report', "low_boll_report"];
    static generateTables(){
        for (let reportUrl of this.reports) {
            $.get(reportUrl, function (data) {
                let report_table = $(`
                    <div class="report">
                        <div class="title">
                            ${data.title} (${data.date})
                        </div>
                        <div class="body">
                        </div>
                    </div>                 
                `);
                for (let reportStock of data.result) {
                    let stockName = reportStock._name;
                    report_table.find(".body").append($(`<div class="row">${stockName}</div>`));
                }

                $('.tables').append(report_table);
            });
        }
    }


    static bindAction(){
        //trigger action
        $(".controller .button-common").each(function (index) {
            $(this).on('click', function () {
                if (confirm('触发这个触发器吗？')) {
                    window.location.href = $(this).attr('url');
                }
            });
        });
    }
}