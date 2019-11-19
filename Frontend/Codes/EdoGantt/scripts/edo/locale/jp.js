Edo.apply(Edo.controls.Datepicker.prototype, {
    weeks: ['日','一','二','三','四','五','六'],
    yearFormat: 'Y年',
    monthFormat: 'm月',
    todayText: '今天'
});
Edo.apply(Edo.MessageBox, {
    buttonText : {
        ok : "确定",
        cancel : "取消",   
        yes : "是",
        no : "否"
    },
    saveText: '保存中...'
});

if(Edo.data.DataGantt){
    Edo.apply(Edo.data.DataGantt, {
        PredecessorLinkType: [
            {ID: 0, Name: '完成-完成(FF)', EName: 'FF', Date: ['Finish', 'Finish']},
            {ID: 1, Name: '完成-开始(FS)', EName: 'FS', Date: ['Finish', 'Start']},
            {ID: 2, Name: '开始-完成(SF)', EName: 'SF', Date: ['Start', 'Finish']},
            {ID: 3, Name: '开始-开始(SS)', EName: 'SS', Date: ['Start', 'Start']}
        ],
        PredecessorLinkTypeMap: {
            FF: 0,
            FS: 1,
            SF: 2,
            SS: 3
        },
        dontUpgrade: '所选定的任务已经是最高级别大纲,不能再升级了',
        dontDowngrade: '不能降级'
    });
}
if(Edo.lists.Gantt){
    Edo.apply(Edo.lists.Gantt, {
        yearText: '年',
        monthText: '月',
        weekText: '周',
        dayText: '日',
        hourText: '时',
        
        scrollDateFormat: 'Y-m-d 星期l',
        
        No: '标识号：',
        name: '名称：',   
        
        summaryText: '摘要',
        milestoneText: '里程碑',
        criticalText: '关键',
        taskText: '任务',
        baselineText: '比较基准',
        percentCompleteText: '进度',
        
        startText: '开始日期',
        finishText: '截止日期',
        tipDateFormat: 'Y年m月d日 H时',//i分
        
        linktaskText: '任务链接',
        delaytimeText: '延隔时间',
        fromText: '从',
        toText: '到',        
        
        weekFormat: 'Y-m-d 星期l',
        monthFormat: 'Y年m月',
        quarterFormat: 'Y年m月 - ',
        yearFormat: 'Y年',
        
        quarterformat2: '{0}年 第{1}季度',
        monthFormat2: 'Y年 - m月'
    });
    Edo.apply(Edo.lists.Gantt.prototype, {
        weeks: ['日','一','二','三','四','五','六']
    });
}