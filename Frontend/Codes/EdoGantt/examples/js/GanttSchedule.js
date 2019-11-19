GanttSchedule = function(){
    GanttSchedule.superclass.constructor.call(this);
}
GanttSchedule.extend(Edo.core.Component, {
    init: function(project){        
        this.project = project;
        //任务树单元格编辑提交处理
        project.tree.on('beforesubmitedit', this.onBeforeSubmitEdit, this);
        //条形图拖拽操作处理
        project.gantt.on('itemdragcomplete', this.onItemDragComplete, this);            
        
        //监听beforecelledit事件, 禁止摘要任务的工期和日期编辑
        project.tree.on('beforecelledit', this.onBeforeCellEdit, this);    
    },
    onBeforeSubmitEdit: function(e){
        /*
            这里单元格编辑处理的逻辑是:
            1.返回false, 不执行默认的编辑行为
            2.获得当前单元格编辑的值, 进行自定义的任务修改, 比如可以做后置任务的日期联动修改等
        */
        var dataGantt = this.project.data;
        
        var task = e.record; //获得当前行任务对象
        var column = e.column; //获得当前编辑的列对象
        dataGantt.beginChange();   
        switch(column.dataIndex){
            case 'Name':
                task.Name = e.value;
            break;
            case 'Start':        
                task.Start = e.value;
            break;
            case 'Finish':        
                task.Finish = e.value;
            break;
            case 'PercentComplete':        
                task.PercentComplete = e.value;
            break;
        }
        dataGantt.endChange();    
        return false;       //这一行代码很重要, 表示本次单元格编辑, 不进行默认操作
    },
    onItemDragComplete: function(e){
        var dataGantt = this.project.data;
    
        var task = e.item;    
        //获得操作后的值,将其覆盖掉任务原来的值,就修改了任务属性
        var value = e[e.action];    
        //设置后,不会因为任务多次操作,而不断引发视图刷新
        dataGantt.beginChange();    
        switch(e.action){
        case 'Start':               //调节开始日期
            task.Start = value;
        break;
        case 'Finish':              //调节完成日期
            task.Finish = value;
        break;
        case 'PercentComplete':     //调节完成百分比
            task.PercentComplete = value;
        break;
        case 'Item':        //拖拽整个ganttItem, 这里用来移动任务整个日期
            value = e.Start;        
            var time = task.Finish.getTime() - task.Start.getTime();
            task.Start = e.Start;
            task.Finish = new Date(task.Start.getTime() + time);
        break;
        }
        //在最后,只进行一次视图刷新, 提升操作性能和体验
        dataGantt.endChange();
    },
    onBeforeCellEdit: function(e){
        var r = e.record;
        var c = e.column;
        
        if(r.Summary ) {                                        
            if(['Start', 'Finish', 'Duration', 'Work'].indexOf(c.dataIndex) != -1){
                return false;
            }
        }
    }
});    