EdoGantt = function () {
    EdoGantt.superclass.constructor.call(this);
    this.data = new Edo.data.DataGantt();
};

EdoGantt.extend(Edo.containers.Box, {
    layout: 'horizontal',
    _setData: function (value) {
        if (value.componentMode != 'data') {
            value = new Edo.data.DataGantt(value);
        }
        if (this.data) {
            this.data.un('datachange', this.onDataChange, this);
        }
        this.data = value;
        //如果已经生成UI
        if (this.gantt) {
            this.tree.set('data', this.data);
            this.gantt.set('data', this.data);
            this.syncGanttDateViewRgion();
        }
        this.data.on('datachange', this.onDataChange, this);
    },
    onDataChange: function (e) {
        this.syncGanttDateViewRgion();
    },
    init: function (owner) {
        this.set('children', [
            {
                name: 'tree', type: 'supertree', width: '100%', height: '100%', cls: 'e-table-sliver', verticalScrollPolicy: 'off', collapseProperty: 'width', enableCollapse: true, splitRegion: 'west',
                treeColumn: 'taskname',
                columns: [
                    {
                        header: ' <a href="http://www.edogantt.com" target="_blank">EdoGantt</a>',
                        columns: [
                            {
                                id: 'id',header: '',width: 32,align: 'center',style:  'cursor:move;',enableDragDrop: true,enableSort: false,dataIndex: 'ID', cls: 'e-table-column-number'
                            },
                            {
                                id: 'taskname', header: Edo.lists.Gantt.taskText, width: 150, dataIndex: 'Name',
                                editor: {
                                    type: 'text'
                                },
                                renderer: function (v, r) {
                                    if (r.Summary) {
                                        return '<b>' + v + '</b>';
                                    }
                                    return v;
                                }
                            },
                            {
                                id: 'startdate', header: Edo.lists.Gantt.startText, dataIndex: 'Start',
                                editor: {
                                    type: 'date'
                                },
                                renderer: function (v) {
                                    if (Edo.isDate(v)) return v.format('Y-m-d');
                                    return '';
                                }
                            },
                            {
                                id: 'finishdate', header: Edo.lists.Gantt.finishText, dataIndex: 'Finish',
                                editor: {
                                    type: 'date'
                                },
                                renderer: function (v) {
                                    if (Edo.isDate(v)) return v.format('Y-m-d');
                                    return '';
                                }
                            },
                            {
                                id: 'percentcomplete', header: Edo.lists.Gantt.percentCompleteText, dataIndex: 'PercentComplete',
                                editor: {
                                    type: 'spinner',
                                    minValue: 0,
                                    maxValue: 100
                                },
                                renderer: function (value, row, column, rowIndex, data, gantt) {
                                    if (!value) value = 0;
                                    return value + '%';
                                }
                            }
                        ]
                    }
                ],
                onselectionchange: function (e) {
                    var rs = this.getSelecteds();

                    if (!rs.equals(gantt.getSelecteds())) {
                        gantt.selectRange(rs, false);
                    }
                },
                onscroll: function (e) {
                    if (this.direction == 'vertical') {
                        gantt.set('scrollTop', e.scrollTop);
                        if (!gantt.autoScrollView) gantt.refresh();
                    }
                }
            },
            {
                name: 'gantt', type: 'gantt', width: '100%', height: '100%',
                scrollTipVisible: true,
                taskNameVisible: true,
                taskLineVisible: true,
                onselectionchange: function (e) {
                    var rs = this.getSelecteds();
                    if (!rs.equals(tree.getSelecteds())) {
                        tree.selectRange(rs, false);
                    }
                },
                onscroll: function (e) {
                    if (this.autoScrollView) {
                        if (this.direction == 'vertical') tree.set('scrollTop', e.scrollTop);
                    }
                },
                onscrollComplete: function (e) {
                    if (!this.autoScrollView && this.direction == 'vertical') {
                        this.refresh();
                        tree.set('scrollTop', this.scrollTop);
                    }
                }
            }
        ]);
        EdoGantt.superclass.init.call(this);

        var tree = Edo.getByName('tree', this)[0];
        var gantt = Edo.getByName('gantt', this)[0];
        this.tree = tree;
        this.gantt = gantt;

        tree.set('data', this.data);
        gantt.set('data', this.data);

        this.syncGanttDateViewRgion();
    },
    syncGanttDateViewRgion: function () {
        if (!this.gantt) return;
        var dateRegion = this.getDateRegion();
        this.gantt.set({
            startDate: dateRegion[0],
            finishDate: dateRegion[1]
        });
    },
    getDateRegion: function () {
        var start = finish = null;

        var view = this.data.source;
        for (var i = 0, l = view.length; i < l; i++) {
            var t = view[i];
            if ((t.Start && t.Start < start) || !start) start = t.Start;
            if ((t.Finish && t.Finish > finish) || !finish) finish = t.Finish;
        }
        if (!start) {
            start = new Date();
            finish = new Date();
        }
        //start = start.add(Date.DAY, -3);
        return [start, finish];
    }
});
EdoGantt.regType('edogantt');
    