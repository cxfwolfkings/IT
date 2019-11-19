GanttMenu = function(){
    GanttMenu.superclass.constructor.call(this);
};   
GanttMenu.extend(Edo.core.Component, {        
    init: function(owner){    
        if(this.owner) return;
        this.owner = owner;
        
        owner.on('contextmenu', this.oncontextmenu, this);        
    },
    destroy: function(){        
        this.owner.un('contextmenu', this.oncontextmenu, this);        
        GanttMenu.superclass.destroy.call(this);
    },
    oncontextmenu: function(e){
        var gantt = this.owner;
        if(gantt.enableMenu === false) return false;
        var ct = gantt;
        if(ct && !ct.within(e)) return;
        e.stopDefault();
        
        var menu = this.getMenu();
        Edo.managers.PopupManager.createPopup({
            target: menu,                                
            x: e.xy[0],
            y: e.xy[1],
            onout: function(e){
                Edo.managers.PopupManager.removePopup(menu);
            }
        });
    },    
    getMenu: function(){
    
        var gantt = owner = this.owner;
        if(gantt.gantt) gantt = gantt.gantt;
        
        function dateViewClick(e){            
            gantt.set('dateView', this.name);            
        }
        function viewModeClick(e){
            gantt.set('viewMode', this.name);
        }
                        
        if(!this.menu){
            this.menu = Edo.create({
                type: 'menu',
                autoHide: true,
                visible: false,
                width: 120,                
                children: [
                    {
                        type: 'button',
                        icon: 'e-icon-gototask',
                        text: GanttMenu.gotoTask,
                        onclick: function(e){
                            var r = gantt.getSelected();
                            if(r){
                                //gantt.scrollIntoTask(r, true);
                                gantt.scrollIntoTask(r);
                            }
                        }
                    },{
                        type: 'hsplit'
                    },
                    {
                        type: 'button',
                        icon: 'e-icon-upgrade',
                        text: GanttMenu.upgradeTaskText,
                        name: 'upgrade',
                        onclick: function(e){
                            var task = gantt.getSelected();
                            if(task){
                                gantt.data.upgrade(task);
                                gantt.data.endChange();
                            }else{
                                alert("请先选择一个任务");
                            }
                        }
                    },
                    {
                        type: 'button',
                        icon: 'e-icon-downgrade',                        
                        text: GanttMenu.downgradeTaskText,
                        name: 'downgrade',
                        onclick: function(e){
                            var task = gantt.getSelected();
                            if(task){
                                gantt.data.downgrade(task);
                                gantt.data.endChange();
                            }else{
                                alert("请先选择一个任务");
                            }
                        }
                    },{
                        type: 'hsplit'
                    },
                    {
                        type: 'button',
                        icon: 'e-icon-add',
                        text: GanttMenu.addTask,
                        name: 'add',
                        onclick: function(e){
                            var task = gantt.getSelected();
                            if(task){
                                var dr = owner.getDateRegion();
                                var p = gantt.data.findParent(task);        
                                var index = p.children.indexOf(task);
                                gantt.data.insert(index, {
                                    UID: new Date().getTime(),
                                    Name: '',
                                    Start: dr[0],
                                    Finish: dr[0].add(Date.DAY, 1),
                                    PercentComplete: 0
                                }, p);
                            }else{
                                alert("请先选择一个任务");
                            }
                        }
                    },
                    {
                        type: 'button',
                        icon: 'e-icon-edit',                        
                        text: GanttMenu.editTask,
                        name: 'edit'
                    },{
                        type: 'button',
                        icon: 'e-icon-delete',                        
                        text: GanttMenu.deleteTask,
                        name: 'delete',
                        onclick: function(e){
                            var task = gantt.getSelected();
                            if(task){
                                if(confirm("确定删除任务:"+task.Name+"　？")){
                                    gantt.data.remove(task);
                                }
                            }else{
                                alert("请先选择一个任务");
                            }
                        }
                    },
                    {
                        type: 'hsplit'
                    },{
                        type: 'button',
                        text: GanttMenu.trackText,
                        popupWidth: 130,
                        menu: [
                            {
                                type: 'button',
                                icon: gantt.progressLineVisible ? 'e-icon-checkbox-checked' : 'e-icon-checkbox',
                                checked: gantt.progressLineVisible,
                                text: GanttMenu.progressLine,
                                onclick: function(){
                                    if(this.checked){
                                        this.set('icon', 'e-icon-checkbox');
                                    }else{
                                        this.set('icon', 'e-icon-checkbox-checked');
                                    }
                                    this.checked = !this.checked;
                                    
                                    gantt.set('progressLineVisible', this.checked);
                                }
                            },{
                                type: 'hsplit'
                            },{
                                type: 'button',                                
                                text: GanttMenu.createbaseline,                                
                                onclick: function(){                                
                                    gantt.data.createBaseline();
                                    gantt.data.refresh();
                                }
                            },{
                                type: 'button',                                
                                text: GanttMenu.clearbaseline,
                                onclick: function(){
                                    gantt.data.clearBaseline();
                                    gantt.data.refresh();
                                }
                            }
                        ]
                    },
                    {
                        type: 'hsplit'
                    },
                    {
                        type: 'button',   
                        name: 'dateviewmenu',
                        text: GanttMenu.defaultDateText,        
                        arrowMode: 'menu',                        
                        onpopupshow: function(e){
                            this.menu.getChildren().each(function(c){
                                c.set('icon', 'e-icon-checkbox');
                            });
                            Edo.getByName(gantt.dateView, this.menu)[0].set('icon', 'e-icon-checkbox-checked');
                        },
                        menu: [
                            {
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText1,
                                name: 'year-quarter',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText2,
                                name: 'year-month',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText3,
                                name: 'year-week',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText4,
                                name: 'year-day',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText5,
                                name: 'quarter-month',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText6,
                                name: 'quarter-week',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText7,
                                name: 'quarter-day',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText8,
                                name: 'month-week',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText9,                               
                                name: 'month-day',
                                onclick: dateViewClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.dateViewText10,                                
                                name: 'week-day',
                                onclick: dateViewClick
                            }
                        ]
                    },{
                        type: 'button',
                        name: 'viewmodemenu',
                        text: GanttMenu.viewText,
                        onpopupshow: function(e){
                            this.menu.getChildren().each(function(c){
                                c.set('icon', 'e-icon-checkbox');
                            });
                            Edo.getByName(gantt.viewMode, this.menu)[0].set('icon', 'e-icon-checkbox-checked');
                        },
                        menu: [
                            {
                                type: 'button',                                
                                text: GanttMenu.ganttView,
                                icon: 'e-icon-checkbox',
                                name: 'gantt',
                                onclick: viewModeClick
                            },{
                                type: 'button',
                                icon: 'e-icon-checkbox',
                                text: GanttMenu.trackView,
                                name: 'track',
                                onclick: viewModeClick
                            }
                        ]
                    }                    
                ],
                render: document.body
            });
        }        
        return this.menu;
    }
});

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