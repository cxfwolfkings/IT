var ganttData = [
    {
        "UID": "1",
        "Duration": 28,
        "Start": "2007-01-01T08:00:00",
        "PercentComplete": 14,
        "Milestone": 0,
        "Finish": "2007-01-04T12:00:00",
        "Summary": 1,
        "ConstraintType": 0,
        "DurationFormat": 21,
        "Type": 1,
        "OutlineLevel": 1,
        "Critical": 1,
        "Notes": "",
        "IsSubprojectReadOnly": 0,
        "CreateDate": "2006-10-27T08:40:00",
        "Hyperlink": "",
        "Name": "项目范围规划",
        "ID": 1,
        "OutlineNumber": "1",
        "Work": 28,
        "HyperlinkAddress": "",
        "Estimated": 0,
        "IsSubproject": 0,
        "Priority": 500,
        "SubprojectName": null,
        "PredecessorLink": [],
        "Assignments": [],
        "PrincipalAssigns": [],
        "expanded": true,
        "ParentTaskUID": -1,
        "children": [
            {
                "UID": "2",
                "Duration": 4,
                "Start": "2007-01-01T08:00:00",
                "PercentComplete": 100,
                "Milestone": 0,
                "Finish": "2007-01-01T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "1", "TaskUID": "2", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 5,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "确定项目范围",
                "ID": 2,
                "OutlineNumber": "1.1",
                "Work": 4,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "Priority": 500,
                "SubprojectName": null,
                "PredecessorLink": [],
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "1",
                "ParentDelay": 0,
                "__cls": "completeTask",
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "3",
                "Duration": 8,
                "Start": "2007-01-01T13:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-02T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "1", "TaskUID": "3", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "获得项目所需资金",
                "ID": 3,
                "OutlineNumber": "1.2",
                "Work": 8,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "获得项目所需资金",
                        "LagFormat": 7,
                        "TaskUID": "3",
                        "PredecessorUID": "2",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "1",
                "ParentDelay": 18000000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "4",
                "Duration": 8,
                "Start": "2007-01-02T13:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-03T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "2", "TaskUID": "4", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "定义预备资源",
                "ID": 4,
                "OutlineNumber": "1.3",
                "Work": 8,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "定义预备资源",
                        "LagFormat": 7,
                        "TaskUID": "4",
                        "PredecessorUID": "3",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "1",
                "ParentDelay": 104400000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "5",
                "Duration": 8,
                "Start": "2007-01-03T13:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-04T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "2", "TaskUID": "5", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "获得核心资源",
                "ID": 5,
                "OutlineNumber": "1.4",
                "Work": 8,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "获得核心资源",
                        "LagFormat": 7,
                        "TaskUID": "5",
                        "PredecessorUID": "4",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "1",
                "ParentDelay": 190800000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "6",
                "Duration": 0,
                "Start": "2007-01-04T12:00:00",
                "PercentComplete": 0,
                "Milestone": 1,
                "Finish": "2007-01-04T12:00:00",
                "Summary": 0,
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "完成项目范围规划",
                "ID": 6,
                "OutlineNumber": "1.5",
                "Work": 0,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "完成项目范围规划",
                        "LagFormat": 7,
                        "TaskUID": "6",
                        "PredecessorUID": "5",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "Assignments": [],
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "1",
                "ParentDelay": 273600000,
                "__depth": 1,
                "__height": 20
            }
        ],
        "__depth": 0,
        "__height": 20
    },
    {
        "UID": "7",
        "Duration": 112,
        "Start": "2007-01-04T13:00:00",
        "PercentComplete": 0,
        "Milestone": 0,
        "Finish": "2007-01-24T12:00:00",
        "Summary": 1,
        "ConstraintType": 0,
        "DurationFormat": 21,
        "Type": 1,
        "OutlineLevel": 1,
        "Critical": 1,
        "Notes": "",
        "IsSubprojectReadOnly": 0,
        "CreateDate": "2006-10-27T08:40:00",
        "Hyperlink": "",
        "Name": "分析/软件需求",
        "ID": 7,
        "OutlineNumber": "2",
        "Work": 120,
        "HyperlinkAddress": "",
        "Estimated": 0,
        "IsSubproject": 0,
        "Priority": 500,
        "SubprojectName": null,
        "PredecessorLink": [],
        "Assignments": [],
        "PrincipalAssigns": [],
        "expanded": true,
        "ParentTaskUID": -1,
        "children": [
            {
                "UID": "8",
                "Duration": 40,
                "Start": "2007-01-04T13:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-11T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "3", "TaskUID": "8", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "行为需求分析",
                "ID": 8,
                "OutlineNumber": "2.1",
                "Work": 40,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "行为需求分析",
                        "LagFormat": 7,
                        "TaskUID": "8",
                        "PredecessorUID": "6",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "7",
                "ParentDelay": 0,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "9",
                "Duration": 24,
                "Start": "2007-01-11T13:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-16T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "3", "TaskUID": "9", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "起草初步的软件规范",
                "ID": 9,
                "OutlineNumber": "2.2",
                "Work": 24,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "起草初步的软件规范",
                        "LagFormat": 7,
                        "TaskUID": "9",
                        "PredecessorUID": "8",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "7",
                "ParentDelay": 604800000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "10",
                "Duration": 16,
                "Start": "2007-01-16T13:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-18T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "2", "TaskUID": "10", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "制定初步预算 ",
                "ID": 10,
                "OutlineNumber": "2.3",
                "Work": 16,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "制定初步预算 ",
                        "LagFormat": 7,
                        "TaskUID": "10",
                        "PredecessorUID": "9",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "7",
                "ParentDelay": 1036800000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "11",
                "Duration": 4,
                "Start": "2007-01-18T13:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-18T17:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "2", "TaskUID": "11", "Units": 1 },
                    { "ResourceUID": "3", "TaskUID": "11", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 5,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "工作组共同审阅软件规范/预算",
                "ID": 11,
                "OutlineNumber": "2.4",
                "Work": 8,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "工作组共同审阅软件规范/预算",
                        "LagFormat": 7,
                        "TaskUID": "11",
                        "PredecessorUID": "10",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "7",
                "ParentDelay": 1209600000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "12",
                "Duration": 8,
                "Start": "2007-01-19T08:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-19T17:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "3", "TaskUID": "12", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "根据反馈修改软件规范",
                "ID": 12,
                "OutlineNumber": "2.5",
                "Work": 8,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "根据反馈修改软件规范",
                        "LagFormat": 7,
                        "TaskUID": "12",
                        "PredecessorUID": "11",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "7",
                "ParentDelay": 1278000000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "13",
                "Duration": 8,
                "Start": "2007-01-22T08:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-22T17:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "2", "TaskUID": "13", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 7,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "制定交付期限",
                "ID": 13,
                "OutlineNumber": "2.6",
                "Work": 8,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "制定交付期限",
                        "LagFormat": 7,
                        "TaskUID": "13",
                        "PredecessorUID": "12",
                        "Type": 1
                    }
                ],
                "Priority": 500,
                "SubprojectName": null,
                "PrincipalAssigns": [],
                "expanded": true,
                "ParentTaskUID": "7",
                "ParentDelay": 1537200000,
                "__depth": 1,
                "__height": 20
            },
            {
                "UID": "14",
                "Duration": 4,
                "Start": "2007-01-23T08:00:00",
                "PercentComplete": 0,
                "Milestone": 0,
                "Finish": "2007-01-23T12:00:00",
                "Summary": 0,
                "Assignments": [
                    { "ResourceUID": "1", "TaskUID": "14", "Units": 1 },
                    { "ResourceUID": "2", "TaskUID": "14", "Units": 1 }
                ],
                "ConstraintType": 0,
                "DurationFormat": 5,
                "Type": 0,
                "OutlineLevel": 2,
                "Critical": 1,
                "Notes": "",
                "IsSubprojectReadOnly": 0,
                "CreateDate": "2006-10-27T08:40:00",
                "Hyperlink": "",
                "Name": "获得开展后续工作的批准(概念、期限和预算)",
                "ID": 14,
                "OutlineNumber": "2.7",
                "Work": 8,
                "HyperlinkAddress": "",
                "Estimated": 0,
                "IsSubproject": 0,
                "PredecessorLink": [
                    {
                        "LinkLag": 0,
                        "Name": "获得开展后续工作的批准(概念、期限和预算)",
                        "LagFormat": 7,
                        "TaskUID": "14",
                        "PredecessorUID": "13",
                        "Type": 1
                    }
                ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "7", "ParentDelay": 1623600000, "__depth": 1, "__height": 20
            },
            {
                "UID": "15", "Duration": 8, "Start": "2007-01-23T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-01-24T12:00:00", "Summary": 0, "Assignments": [
                   { "ResourceUID": "2", "TaskUID": "15", "Units": 1 }
                ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "获得所需资源", "ID": 15, "OutlineNumber": "2.8", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                    { "LinkLag": 0, "Name": "获得所需资源", "LagFormat": 7, "TaskUID": "15", "PredecessorUID": "14", "Type": 1 }
                ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "7", "ParentDelay": 1641600000, "__depth": 1, "__height": 20
            },
            {
                "UID": "16", "Duration": 0, "Start": "2007-01-24T12:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-01-24T12:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成分析工作", "ID": 16, "OutlineNumber": "2.9", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "完成分析工作", "LagFormat": 7, "TaskUID": "16", "PredecessorUID": "15", "Type": 1 }
                ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "7", "ParentDelay": 1724400000, "__depth": 1, "__height": 20
            }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "17", "Duration": 116, "Start": "2007-01-24T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-13T17:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "设计 ", "ID": 17, "OutlineNumber": "3", "Work": 120, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "18", "Duration": 16, "Start": "2007-01-24T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-01-26T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "3", "TaskUID": "18", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "审阅初步的软件规范", "ID": 18, "OutlineNumber": "3.1", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "审阅初步的软件规范", "LagFormat": 7, "TaskUID": "18", "PredecessorUID": "16", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "17", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "19", "Duration": 40, "Start": "2007-01-26T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-02T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "3", "TaskUID": "19", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "制定功能规范", "ID": 19, "OutlineNumber": "3.2", "Work": 40, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "制定功能规范", "LagFormat": 7, "TaskUID": "19", "PredecessorUID": "18", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "17", "ParentDelay": 172800000, "__depth": 1, "__height": 20
           },
           {
               "UID": "20", "Duration": 32, "Start": "2007-02-02T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-08T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "3", "TaskUID": "20", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "根据功能规范开发原型", "ID": 20, "OutlineNumber": "3.3", "Work": 32, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "根据功能规范开发原型", "LagFormat": 7, "TaskUID": "20", "PredecessorUID": "19", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "17", "ParentDelay": 777600000, "__depth": 1, "__height": 20
           },
           {
               "UID": "21", "Duration": 16, "Start": "2007-02-08T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-12T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "1", "TaskUID": "21", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "审阅功能规范", "ID": 21, "OutlineNumber": "3.4", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "审阅功能规范", "LagFormat": 7, "TaskUID": "21", "PredecessorUID": "20", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "17", "ParentDelay": 1296000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "22", "Duration": 8, "Start": "2007-02-12T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-13T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "1", "TaskUID": "22", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "根据反馈修改功能规范", "ID": 22, "OutlineNumber": "3.5", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "根据反馈修改功能规范", "LagFormat": 7, "TaskUID": "22", "PredecessorUID": "21", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "17", "ParentDelay": 1641600000, "__depth": 1, "__height": 20
           },
           {
               "UID": "23", "Duration": 4, "Start": "2007-02-13T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-13T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "1", "TaskUID": "23", "Units": 1 },
                  { "ResourceUID": "2", "TaskUID": "23", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 5, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "获得开展后续工作的批准", "ID": 23, "OutlineNumber": "3.6", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "获得开展后续工作的批准", "LagFormat": 7, "TaskUID": "23", "PredecessorUID": "22", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "17", "ParentDelay": 1728000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "24", "Duration": 0, "Start": "2007-02-13T17:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-02-13T17:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成设计工作", "ID": 24, "OutlineNumber": "3.7", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "完成设计工作", "LagFormat": 7, "TaskUID": "24", "PredecessorUID": "23", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "17", "ParentDelay": 1742400000, "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "25", "Duration": 174, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-15T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "开发", "ID": 25, "OutlineNumber": "4", "Work": 264, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "26", "Duration": 8, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-14T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "4", "TaskUID": "26", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "审阅功能规范", "ID": 26, "OutlineNumber": "4.1", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "审阅功能规范", "LagFormat": 7, "TaskUID": "26", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "25", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "27", "Duration": 8, "Start": "2007-02-15T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-15T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "4", "TaskUID": "27", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "确定模块化/分层设计参数", "ID": 27, "OutlineNumber": "4.2", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "确定模块化/分层设计参数", "LagFormat": 7, "TaskUID": "27", "PredecessorUID": "26", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "25", "ParentDelay": 86400000, "__depth": 1, "__height": 20
           },
           {
               "UID": "28", "Duration": 8, "Start": "2007-02-16T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-16T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "4", "TaskUID": "28", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "分派任务给开发人员", "ID": 28, "OutlineNumber": "4.3", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "分派任务给开发人员", "LagFormat": 7, "TaskUID": "28", "PredecessorUID": "27", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "25", "ParentDelay": 172800000, "__depth": 1, "__height": 20
           },
           {
               "UID": "29", "Duration": 120, "Start": "2007-02-19T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-09T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "4", "TaskUID": "29", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "编写代码", "ID": 29, "OutlineNumber": "4.4", "Work": 120, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "编写代码", "LagFormat": 7, "TaskUID": "29", "PredecessorUID": "28", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "25", "ParentDelay": 432000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "30", "Duration": 120, "Start": "2007-02-22T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-15T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "4", "TaskUID": "30", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "开发人员测试(初步调试)", "ID": 30, "OutlineNumber": "4.5", "Work": 120, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": -75, "Name": "开发人员测试(初步调试)", "LagFormat": 19, "TaskUID": "30", "PredecessorUID": "29", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "25", "ParentDelay": 716400000, "__depth": 1, "__height": 20
           },
           {
               "UID": "31", "Duration": 0, "Start": "2007-03-15T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-03-15T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成开发工作", "ID": 31, "OutlineNumber": "4.6", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "完成开发工作", "LagFormat": 7, "TaskUID": "31", "PredecessorUID": "30", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "25", "ParentDelay": 2530800000, "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "32", "Duration": 390, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-23T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "测试", "ID": 32, "OutlineNumber": "5", "Work": 280, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "33", "Duration": 32, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-19T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "5", "TaskUID": "33", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "根据产品规范制定单元测试计划", "ID": 33, "OutlineNumber": "5.1", "Work": 32, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "根据产品规范制定单元测试计划", "LagFormat": 7, "TaskUID": "33", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "32", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "34", "Duration": 32, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-19T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "5", "TaskUID": "34", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "根据产品规范制定整体测试计划", "ID": 34, "OutlineNumber": "5.2", "Work": 32, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "根据产品规范制定整体测试计划", "LagFormat": 7, "TaskUID": "34", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "32", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "35", "Duration": 120, "Start": "2007-03-15T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-05T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "单元测试", "ID": 35, "OutlineNumber": "5.3", "Work": 120, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "32", "ParentDelay": 2530800000, "children": [
                  {
                      "UID": "36", "Duration": 40, "Start": "2007-03-15T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-22T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "36", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "审阅模块化代码", "ID": 36, "OutlineNumber": "5.3.1", "Work": 40, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "审阅模块化代码", "LagFormat": 7, "TaskUID": "36", "PredecessorUID": "33", "Type": 1 },
                          { "LinkLag": 0, "Name": "审阅模块化代码", "LagFormat": 7, "TaskUID": "36", "PredecessorUID": "31", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "35", "ParentDelay": 0, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "37", "Duration": 16, "Start": "2007-03-22T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-26T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "37", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "测试组件模块是否符合产品规范", "ID": 37, "OutlineNumber": "5.3.2", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "测试组件模块是否符合产品规范", "LagFormat": 7, "TaskUID": "37", "PredecessorUID": "31", "Type": 1 },
                          { "LinkLag": 0, "Name": "测试组件模块是否符合产品规范", "LagFormat": 7, "TaskUID": "37", "PredecessorUID": "36", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "35", "ParentDelay": 604800000, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "38", "Duration": 24, "Start": "2007-03-26T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-29T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "38", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "找出不符合产品规范的异常情况", "ID": 38, "OutlineNumber": "5.3.3", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "找出不符合产品规范的异常情况", "LagFormat": 7, "TaskUID": "38", "PredecessorUID": "37", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "35", "ParentDelay": 950400000, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "39", "Duration": 24, "Start": "2007-03-29T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-03T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "39", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "修改代码", "ID": 39, "OutlineNumber": "5.3.4", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "修改代码", "LagFormat": 7, "TaskUID": "39", "PredecessorUID": "38", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "35", "ParentDelay": 1209600000, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "40", "Duration": 16, "Start": "2007-04-03T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-05T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "40", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "重新测试经过修改的代码", "ID": 40, "OutlineNumber": "5.3.5", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "重新测试经过修改的代码", "LagFormat": 7, "TaskUID": "40", "PredecessorUID": "39", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "35", "ParentDelay": 1641600000, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "41", "Duration": 0, "Start": "2007-04-05T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-04-05T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成单元测试", "ID": 41, "OutlineNumber": "5.3.6", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                         { "LinkLag": 0, "Name": "完成单元测试", "LagFormat": 7, "TaskUID": "41", "PredecessorUID": "40", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "35", "ParentDelay": 1814400000, "__depth": 2, "__height": 20
                  }
               ], "__depth": 1, "__height": 20
           },
           {
               "UID": "42", "Duration": 96, "Start": "2007-04-05T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-23T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "整体测试", "ID": 42, "OutlineNumber": "5.4", "Work": 96, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "32", "ParentDelay": 4345200000, "children": [
                  {
                      "UID": "43", "Duration": 40, "Start": "2007-04-05T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-12T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "43", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "测试模块集成情况", "ID": 43, "OutlineNumber": "5.4.1", "Work": 40, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "测试模块集成情况", "LagFormat": 7, "TaskUID": "43", "PredecessorUID": "41", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "42", "ParentDelay": 0, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "44", "Duration": 16, "Start": "2007-04-12T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-16T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "44", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "找出不符合规范的异常情况", "ID": 44, "OutlineNumber": "5.4.2", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "找出不符合规范的异常情况", "LagFormat": 7, "TaskUID": "44", "PredecessorUID": "43", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "42", "ParentDelay": 604800000, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "45", "Duration": 24, "Start": "2007-04-16T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-19T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "45", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "修改代码", "ID": 45, "OutlineNumber": "5.4.3", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "修改代码", "LagFormat": 7, "TaskUID": "45", "PredecessorUID": "44", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "42", "ParentDelay": 950400000, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "46", "Duration": 16, "Start": "2007-04-19T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-23T15:00:00", "Summary": 0, "Assignments": [
                         { "ResourceUID": "5", "TaskUID": "46", "Units": 1 }
                      ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "重新测试经过修改的代码", "ID": 46, "OutlineNumber": "5.4.4", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                          { "LinkLag": 0, "Name": "重新测试经过修改的代码", "LagFormat": 7, "TaskUID": "46", "PredecessorUID": "45", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "42", "ParentDelay": 1209600000, "__depth": 2, "__height": 20
                  },
                  {
                      "UID": "47", "Duration": 0, "Start": "2007-04-23T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-04-23T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 3, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成整体测试", "ID": 47, "OutlineNumber": "5.4.5", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                         { "LinkLag": 0, "Name": "完成整体测试", "LagFormat": 7, "TaskUID": "47", "PredecessorUID": "46", "Type": 1 }
                      ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "42", "ParentDelay": 1555200000, "__depth": 2, "__height": 20
                  }
               ], "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "48", "Duration": 366, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-18T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "培训", "ID": 48, "OutlineNumber": "6", "Work": 256, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "49", "Duration": 24, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-16T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "6", "TaskUID": "49", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "制定针对最终用户的培训规范", "ID": 49, "OutlineNumber": "6.1", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "制定针对最终用户的培训规范", "LagFormat": 7, "TaskUID": "49", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "50", "Duration": 24, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-16T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "6", "TaskUID": "50", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "制定针对产品技术支持人员的培训规范", "ID": 50, "OutlineNumber": "6.2", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "制定针对产品技术支持人员的培训规范", "LagFormat": 7, "TaskUID": "50", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "51", "Duration": 16, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-15T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "6", "TaskUID": "51", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "确定培训方法(基于计算机的培训、教室授课等)", "ID": 51, "OutlineNumber": "6.3", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "确定培训方法(基于计算机的培训、教室授课等)", "LagFormat": 7, "TaskUID": "51", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "52", "Duration": 120, "Start": "2007-03-15T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-05T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "6", "TaskUID": "52", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 9, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "编写培训材料", "ID": 52, "OutlineNumber": "6.4", "Work": 120, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "编写培训材料", "LagFormat": 7, "TaskUID": "52", "PredecessorUID": "49", "Type": 1 },
                   { "LinkLag": 0, "Name": "编写培训材料", "LagFormat": 7, "TaskUID": "52", "PredecessorUID": "31", "Type": 1 },
                   { "LinkLag": 0, "Name": "编写培训材料", "LagFormat": 7, "TaskUID": "52", "PredecessorUID": "50", "Type": 1 },
                   { "LinkLag": 0, "Name": "编写培训材料", "LagFormat": 7, "TaskUID": "52", "PredecessorUID": "51", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 2530800000, "__depth": 1, "__height": 20
           },
           {
               "UID": "53", "Duration": 32, "Start": "2007-04-05T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-11T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "6", "TaskUID": "53", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "研究培训材料的可用性", "ID": 53, "OutlineNumber": "6.5", "Work": 32, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "研究培训材料的可用性", "LagFormat": 7, "TaskUID": "53", "PredecessorUID": "52", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 4345200000, "__depth": 1, "__height": 20
           },
           {
               "UID": "54", "Duration": 24, "Start": "2007-04-11T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-16T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "6", "TaskUID": "54", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "对培训材料进行最后处理", "ID": 54, "OutlineNumber": "6.6", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "对培训材料进行最后处理", "LagFormat": 7, "TaskUID": "54", "PredecessorUID": "53", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 4863600000, "__depth": 1, "__height": 20
           },
           {
               "UID": "55", "Duration": 16, "Start": "2007-04-16T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-18T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "6", "TaskUID": "55", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "制定培训机制", "ID": 55, "OutlineNumber": "6.7", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "制定培训机制", "LagFormat": 7, "TaskUID": "55", "PredecessorUID": "54", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 5295600000, "__depth": 1, "__height": 20
           },
           {
               "UID": "56", "Duration": 0, "Start": "2007-04-18T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-04-18T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成培训材料", "ID": 56, "OutlineNumber": "6.8", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "完成培训材料", "LagFormat": 7, "TaskUID": "56", "PredecessorUID": "55", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "48", "ParentDelay": 5468400000, "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "57", "Duration": 244, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-28T12:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "文档", "ID": 57, "OutlineNumber": "7", "Work": 336, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "58", "Duration": 8, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-14T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "58", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "制定“帮助”规范 ", "ID": 58, "OutlineNumber": "7.1", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "制定“帮助”规范 ", "LagFormat": 7, "TaskUID": "58", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "59", "Duration": 120, "Start": "2007-02-28T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-21T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "59", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 9, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "开发“帮助”系统", "ID": 59, "OutlineNumber": "7.2", "Work": 120, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "开发“帮助”系统", "LagFormat": 7, "TaskUID": "59", "PredecessorUID": "58", "Type": 1 },
                   { "LinkLag": -50, "Name": "开发“帮助”系统", "LagFormat": 19, "TaskUID": "59", "PredecessorUID": "29", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 1227600000, "__depth": 1, "__height": 20
           },
           {
               "UID": "60", "Duration": 24, "Start": "2007-03-21T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-26T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "60", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "审阅“帮助”文档", "ID": 60, "OutlineNumber": "7.3", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "审阅“帮助”文档", "LagFormat": 7, "TaskUID": "60", "PredecessorUID": "59", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 3042000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "61", "Duration": 16, "Start": "2007-03-26T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-28T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "61", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "根据反馈修改“帮助”文档", "ID": 61, "OutlineNumber": "7.4", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "根据反馈修改“帮助”文档", "LagFormat": 7, "TaskUID": "61", "PredecessorUID": "60", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 3474000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "62", "Duration": 16, "Start": "2007-02-14T08:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-02-15T17:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "62", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "制定用户手册规范", "ID": 62, "OutlineNumber": "7.5", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "制定用户手册规范", "LagFormat": 7, "TaskUID": "62", "PredecessorUID": "24", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "63", "Duration": 120, "Start": "2007-02-28T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-21T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "63", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 9, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "编写用户手册", "ID": 63, "OutlineNumber": "7.6", "Work": 120, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "编写用户手册", "LagFormat": 7, "TaskUID": "63", "PredecessorUID": "62", "Type": 1 },
                   { "LinkLag": -50, "Name": "编写用户手册", "LagFormat": 19, "TaskUID": "63", "PredecessorUID": "29", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 1227600000, "__depth": 1, "__height": 20
           },
           {
               "UID": "64", "Duration": 16, "Start": "2007-03-21T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-23T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "64", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "审阅所有的用户文档", "ID": 64, "OutlineNumber": "7.7", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "审阅所有的用户文档", "LagFormat": 7, "TaskUID": "64", "PredecessorUID": "63", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 3042000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "65", "Duration": 16, "Start": "2007-03-23T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-03-27T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "7", "TaskUID": "65", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "根据反馈修改用户文档", "ID": 65, "OutlineNumber": "7.8", "Work": 16, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "根据反馈修改用户文档", "LagFormat": 7, "TaskUID": "65", "PredecessorUID": "64", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 3214800000, "__depth": 1, "__height": 20
           },
           {
               "UID": "66", "Duration": 0, "Start": "2007-03-28T12:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-03-28T12:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成文档", "ID": 66, "OutlineNumber": "7.9", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "完成文档", "LagFormat": 7, "TaskUID": "66", "PredecessorUID": "65", "Type": 1 },
                  { "LinkLag": 0, "Name": "完成文档", "LagFormat": 7, "TaskUID": "66", "PredecessorUID": "61", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "57", "ParentDelay": 3643200000, "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "67", "Duration": 562, "Start": "2007-01-24T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-02T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "试生产", "ID": 67, "OutlineNumber": "8", "Work": 64, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "68", "Duration": 8, "Start": "2007-01-24T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-01-25T12:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "2", "TaskUID": "68", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "确定测试群体", "ID": 68, "OutlineNumber": "8.1", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "确定测试群体", "LagFormat": 7, "TaskUID": "68", "PredecessorUID": "16", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "67", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "69", "Duration": 8, "Start": "2007-01-25T13:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-01-26T12:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 0, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "确定软件分发机制", "ID": 69, "OutlineNumber": "8.2", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "确定软件分发机制", "LagFormat": 7, "TaskUID": "69", "PredecessorUID": "68", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "67", "ParentDelay": 86400000, "__depth": 1, "__height": 20
           },
           {
               "UID": "70", "Duration": 8, "Start": "2007-04-23T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-04-24T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "70", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "安装/部署软件", "ID": 70, "OutlineNumber": "8.3", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "安装/部署软件", "LagFormat": 7, "TaskUID": "70", "PredecessorUID": "47", "Type": 1 },
                   { "LinkLag": 0, "Name": "安装/部署软件", "LagFormat": 7, "TaskUID": "70", "PredecessorUID": "69", "Type": 1 },
                   { "LinkLag": 0, "Name": "安装/部署软件", "LagFormat": 7, "TaskUID": "70", "PredecessorUID": "66", "Type": 1 },
                   { "LinkLag": 0, "Name": "安装/部署软件", "LagFormat": 7, "TaskUID": "70", "PredecessorUID": "56", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "67", "ParentDelay": 7696800000, "__depth": 1, "__height": 20
           },
           {
               "UID": "71", "Duration": 40, "Start": "2007-04-24T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-01T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "71", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 9, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "获得用户反馈", "ID": 71, "OutlineNumber": "8.4", "Work": 40, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "获得用户反馈", "LagFormat": 7, "TaskUID": "71", "PredecessorUID": "70", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "67", "ParentDelay": 7783200000, "__depth": 1, "__height": 20
           },
           {
               "UID": "72", "Duration": 8, "Start": "2007-05-01T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-02T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "72", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "评估测试信息", "ID": 72, "OutlineNumber": "8.5", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "评估测试信息", "LagFormat": 7, "TaskUID": "72", "PredecessorUID": "71", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "67", "ParentDelay": 8388000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "73", "Duration": 0, "Start": "2007-05-02T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-05-02T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成试生产工作", "ID": 73, "OutlineNumber": "8.6", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "完成试生产工作", "LagFormat": 7, "TaskUID": "73", "PredecessorUID": "72", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "67", "ParentDelay": 8474400000, "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "74", "Duration": 40, "Start": "2007-05-02T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-09T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "部署", "ID": 74, "OutlineNumber": "9", "Work": 40, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "75", "Duration": 8, "Start": "2007-05-02T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-03T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "75", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "确定最终部署策略", "ID": 75, "OutlineNumber": "9.1", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "确定最终部署策略", "LagFormat": 7, "TaskUID": "75", "PredecessorUID": "73", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "74", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "76", "Duration": 8, "Start": "2007-05-03T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-04T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "76", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "确定部署方法", "ID": 76, "OutlineNumber": "9.2", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "确定部署方法", "LagFormat": 7, "TaskUID": "76", "PredecessorUID": "75", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "74", "ParentDelay": 86400000, "__depth": 1, "__height": 20
           },
           {
               "UID": "77", "Duration": 8, "Start": "2007-05-04T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-07T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "77", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "获得部署所需资源", "ID": 77, "OutlineNumber": "9.3", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "获得部署所需资源", "LagFormat": 7, "TaskUID": "77", "PredecessorUID": "76", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "74", "ParentDelay": 172800000, "__depth": 1, "__height": 20
           },
           {
               "UID": "78", "Duration": 8, "Start": "2007-05-07T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-08T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "78", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "培训技术支持人员", "ID": 78, "OutlineNumber": "9.4", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "培训技术支持人员", "LagFormat": 7, "TaskUID": "78", "PredecessorUID": "77", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "74", "ParentDelay": 432000000, "__depth": 1, "__height": 20
           },
           {
               "UID": "79", "Duration": 8, "Start": "2007-05-08T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-09T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "8", "TaskUID": "79", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "部署软件", "ID": 79, "OutlineNumber": "9.5", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "部署软件", "LagFormat": 7, "TaskUID": "79", "PredecessorUID": "78", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "74", "ParentDelay": 518400000, "__depth": 1, "__height": 20
           },
           {
               "UID": "80", "Duration": 0, "Start": "2007-05-09T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-05-09T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成部署工作", "ID": 80, "OutlineNumber": "9.6", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "完成部署工作", "LagFormat": 7, "TaskUID": "80", "PredecessorUID": "79", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "74", "ParentDelay": 604800000, "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "81", "Duration": 24, "Start": "2007-05-09T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-14T15:00:00", "Summary": 1, "ConstraintType": 0, "DurationFormat": 21, "Type": 1, "OutlineLevel": 1, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "实施工作结束后的回顾", "ID": 81, "OutlineNumber": "10", "Work": 24, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "Priority": 500, "SubprojectName": null, "PredecessorLink": [], "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "children": [
           {
               "UID": "82", "Duration": 8, "Start": "2007-05-09T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-10T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "2", "TaskUID": "82", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "将经验教训记录存档", "ID": 82, "OutlineNumber": "10.1", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "将经验教训记录存档", "LagFormat": 7, "TaskUID": "82", "PredecessorUID": "80", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "81", "ParentDelay": 0, "__depth": 1, "__height": 20
           },
           {
               "UID": "83", "Duration": 8, "Start": "2007-05-10T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-11T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "2", "TaskUID": "83", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "分发给工作组成员", "ID": 83, "OutlineNumber": "10.2", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "分发给工作组成员", "LagFormat": 7, "TaskUID": "83", "PredecessorUID": "82", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "81", "ParentDelay": 86400000, "__depth": 1, "__height": 20
           },
           {
               "UID": "84", "Duration": 8, "Start": "2007-05-11T15:00:00", "PercentComplete": 0, "Milestone": 0, "Finish": "2007-05-14T15:00:00", "Summary": 0, "Assignments": [
                  { "ResourceUID": "2", "TaskUID": "84", "Units": 1 }
               ], "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "建立软件维护小组", "ID": 84, "OutlineNumber": "10.3", "Work": 8, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                   { "LinkLag": 0, "Name": "建立软件维护小组", "LagFormat": 7, "TaskUID": "84", "PredecessorUID": "83", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "81", "ParentDelay": 172800000, "__depth": 1, "__height": 20
           },
           {
               "UID": "85", "Duration": 0, "Start": "2007-05-14T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-05-14T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 2, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "完成回顾", "ID": 85, "OutlineNumber": "10.4", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
                  { "LinkLag": 0, "Name": "完成回顾", "LagFormat": 7, "TaskUID": "85", "PredecessorUID": "84", "Type": 1 }
               ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": "81", "ParentDelay": 432000000, "__depth": 1, "__height": 20
           }
        ], "__depth": 0, "__height": 20
    },
    {
        "UID": "86", "Duration": 0, "Start": "2007-05-14T15:00:00", "PercentComplete": 0, "Milestone": 1, "Finish": "2007-05-14T15:00:00", "Summary": 0, "ConstraintType": 0, "DurationFormat": 7, "Type": 0, "OutlineLevel": 1, "Critical": 1, "Notes": "", "IsSubprojectReadOnly": 0, "CreateDate": "2006-10-27T08:40:00", "Hyperlink": "", "Name": "软件开发模板结束", "ID": 86, "OutlineNumber": "11", "Work": 0, "HyperlinkAddress": "", "Estimated": 0, "IsSubproject": 0, "PredecessorLink": [
           { "LinkLag": 0, "Name": "软件开发模板结束", "LagFormat": 7, "TaskUID": "86", "PredecessorUID": "85", "Type": 1 }
        ], "Priority": 500, "SubprojectName": null, "Assignments": [], "PrincipalAssigns": [], "expanded": true, "ParentTaskUID": -1, "__depth": 0, "__height": 20
    }
];
//JSON处理下, 目的是将"2007-10-11T11:00:00"日期字符串, 转换为Date日期对象
ganttData = Edo.util.JSON.decode(Edo.util.JSON.encode(ganttData));