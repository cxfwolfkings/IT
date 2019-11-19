Edo.apply(Edo.controls.DatePicker.prototype, {
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
if(GanttMenu){
    Edo.apply(GanttMenu, {
        gotoTask: '转到任务',
        upgradeTaskText: '升级',
        downgradeTaskText: '降级',
        addTask: '新增任务',
        editTask: '修改任务',
        deleteTask: '删除任务',
        
        trackText: '跟踪',
        progressLine: '进度线',    
        createbaseline: '设置比较基准',
        clearbaseline: '清除比较基准',
        viewAreaText: '视图显示区',
        showTreeAndGantt: '任务树和条形图',
        showTreeOnly: '只显示任务树',
        showGanttOnly: '只显示条形图',
        
        defaultDateText: '日期 : 周/天',
        dateViewText1: '年/季',
        dateViewText2: '年/月',
        dateViewText3: '年/周',
        dateViewText4: '年/天',
        dateViewText5: '季/月',
        dateViewText6: '季/周',
        dateViewText7: '季/天',
        dateViewText8: '月/周',
        dateViewText9: '月/天',
        dateViewText10: '周/天',
        
        viewText: '视图',
        ganttView: '甘特图',
        trackView: '跟踪甘特图',
        
        selectTask: '请先选择一个任务'
    });    
}