Edo.apply(Edo.controls.DatePicker.prototype, {    
    weeks: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    yearFormat: 'Y',
    monthFormat: 'm',
    todayText: 'Today'
});
Edo.apply(Edo.MessageBox, {
    buttonText : {
        ok : "Ok",
        cancel : "Cancel",   
        yes : "Yes",
        no : "No"
    },
    saveText: 'Saving...'
});

if(Edo.data.DataGantt){
    Edo.apply(Edo.data.DataGantt, {
        PredecessorLinkType: [
            {ID: 0, Name: 'FF', EName: 'FF', Date: ['Finish', 'Finish']},
            {ID: 1, Name: 'FS', EName: 'FS', Date: ['Finish', 'Start']},
            {ID: 2, Name: 'SF', EName: 'SF', Date: ['Start', 'Finish']},
            {ID: 3, Name: 'SS', EName: 'SS', Date: ['Start', 'Start']}
        ],
        PredecessorLinkTypeMap: {
            FF: 0,
            FS: 1,
            SF: 2,
            SS: 3
        },
        dontUpgrade: 'The selected task is already the highest-level framework can not be upgraded!',
        dontDowngrade: 'Can not downgrade!'
    });
}
if(Edo.lists.Gantt){
    Edo.apply(Edo.lists.Gantt, {
        yearText: '',
        monthText: '',
        weekText: '',
        dayText: '',
        hourText: '',
        
        scrollDateFormat: 'Y-m-d l',
        
        No: 'ID：',
        name: 'Name：',   
        
        summaryText: 'Summay',
        milestoneText: 'Milestone',
        criticalText: 'Critical',
        taskText: 'Name',
        baselineText: 'Baseline',
        percentCompleteText: 'PercentComplete',
        
        startText: 'StartDate',
        finishText: 'FinishDate',
        tipDateFormat: 'Y-m-d H',//i分
        
        linktaskText: 'LinkType',
        delaytimeText: 'LagTime',
        fromText: 'From',
        toText: 'To',        
        
        weekFormat: 'Y-m-d l',
        monthFormat: 'Y-m',
        quarterFormat: 'Y-m Q',
        yearFormat: 'Y',
        
        quarterformat2: '{0} {1}',
        monthFormat2: 'Y - m'
    });
    Edo.apply(Edo.lists.Gantt.prototype, {
        weeks: ['S','M','T','W','T','F','S']
    });
}

if(GanttMenu){
    Edo.apply(GanttMenu, {
        gotoTask: 'Goto Task',
        upgradeTaskText: 'Upgrade',
        downgradeTaskText: 'Downgrade',
        addTask: 'AddTask',
        editTask: 'ModifyTask',
        deleteTask: 'RemoveTask',
        
        trackText: 'Track',
        progressLine: 'ProgressLine',    
        createbaseline: 'Set Baseline',
        clearbaseline: 'Clear Baseline',
        viewAreaText: 'View Region',
        showTreeAndGantt: 'Tree and Bar',
        showTreeOnly: 'Only Tree',
        showGanttOnly: 'Only Bar',
        
        defaultDateText: 'DateMode',
        dateViewText1: 'Year/Quarter',
        dateViewText2: 'Year/Month',
        dateViewText3: 'Year/Week',
        dateViewText4: 'Year/Day',
        dateViewText5: 'Quarter/Month',
        dateViewText6: 'Quarter/Week',
        dateViewText7: 'Quarter/Day',
        dateViewText8: 'Month/Week',
        dateViewText9: 'Month/Day',
        dateViewText10: 'Week/Day',
        
        viewText: 'ViewMode',
        ganttView: 'Gantt',
        trackView: 'Track',
        
        selectTask: 'Please select a task'
    });    
}