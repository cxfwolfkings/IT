const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const Tray = electron.Tray;
const remote = electron.remote;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

let tray;
let contextMenu

let template = [{
    label: '文件',   //设置菜单项文本
    submenu: [    //设置子菜单
        {
            label: '关于',
            role: 'about',       // 设置菜单角色（关于），只针对 Mac  OS X 系统
            click: () => {     //设置单击菜单项的动作（弹出一个新的模态窗口）
                var aboutWin = new BrowserWindow({ width: 300, height: 200, parent: win, modal: true });
                aboutWin.loadFile('https://geekori.com');
            }
        },
        {
            type: 'separator'       //设置菜单的类型是分隔栏
        },
        {
            label: '关闭',
            accelerator: 'Command+Q',      //设置菜单的热键
            click: () => { win.close() }
        }
    ]
},
{
    label: '编辑',
    submenu: [
        {
            label: '复制',
            click: () => { win.webContents.insertText('复制') }

        },
        {
            label: '剪切',
            click: () => { win.webContents.insertText('剪切') }

        },
        {
            type: 'separator'
        },
        {
            label: '查找',
            accelerator: 'Command+F',
            click: () => { win.webContents.insertText('查找') }
        },
        {
            label: '替换',
            accelerator: 'Command+R',
            click: () => { win.webContents.insertText('替换') }
        }
    ]
}
];

function createWindow() {
    console.log('\t\ncreateWindow begin...')
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // 解决 Electron 5.0 版本出现 require is not defined 的问题
        webPreferences: {
            nodeIntegration: true
        }
    })
    // 然后加载应用的 index.html
    win.loadFile('index.html')

    // 定义菜单模板
    // 菜单角色
    // const template = [
    //     {
    //         label: '编辑',
    //         submenu: [
    //             {
    //                 label: '撤销',
    //                 role: 'undo'

    //             },
    //             {
    //                 label: '重做',
    //                 role: 'redo'

    //             },
    //             {
    //                 label: '剪切',
    //                 role: 'cut'
    //             },
    //             {
    //                 label: '复制',
    //                 role: 'copy'
    //             },
    //             {
    //                 label: '粘贴',
    //                 role: 'paste'
    //             }
    //         ]
    //     },
    //     {
    //         label: '调试',
    //         submenu: [
    //             {
    //                 label: '显示调试工具',
    //                 role: 'toggleDevTools'

    //             }
    //         ]
    //     }
    //     ,
    //     {
    //         label: '窗口',
    //         submenu: [
    //             {
    //                 label: '全屏显示窗口',
    //                 role: 'toggleFullScreen'

    //             },
    //             {
    //                 label: '窗口放大10%',
    //                 role: 'zoomIn'

    //             },
    //             ,
    //             {
    //                 label: '窗口缩小10%',
    //                 role: 'zoomOut'

    //             }
    //         ]
    //     }
    // ];
    // if (process.platform == 'darwin') {

    //     template.unshift({
    //         label: 'Mac',
    //         submenu: [
    //             {
    //                 label: '关于',
    //                 role: 'about'

    //             },
    //             {
    //                 label: '开始说话',
    //                 role: 'startSpeaking'

    //             },
    //             {
    //                 label: '停止说话',
    //                 role: 'stopSpeaking'

    //             }
    //         ]
    //     })
    // }

    // 菜单类型
    // const template = [
    //     {
    //         label: '编辑',
    //         submenu: [
    //             {
    //                 label: '撤销',
    //                 role: 'undo'

    //             },
    //             {
    //                 label: '重做',
    //                 role: 'redo'

    //             },
    //             {
    //                 type: 'separator'   // 设置菜单项分隔条
    //             },
    //             {
    //                 label: '剪切',
    //                 role: 'cut'
    //             },
    //             {
    //                 label: '复制',
    //                 role: 'copy'
    //             },
    //             {
    //                 label: '粘贴',
    //                 role: 'paste'
    //             }
    //         ]
    //     }
    //     ,
    //     {
    //         label: '我的菜单',   //  包含单选菜单项、多选菜单项和带子菜单的菜单项
    //         submenu: [
    //             {
    //                 label: '多选1',
    //                 type: 'checkbox'
    //             },
    //             {
    //                 label: '多选2',
    //                 type: 'checkbox'
    //             }
    //             ,
    //             {
    //                 label: '多选3',
    //                 type: 'checkbox'
    //             }
    //             ,
    //             {
    //                 label: '单选1',
    //                 type: 'radio'

    //             }
    //             ,
    //             {
    //                 label: '单选2',
    //                 type: 'radio'

    //             }
    //             ,

    //             {
    //                 label: '单选3',
    //                 type: 'radio'

    //             }
    //             ,

    //             {
    //                 label: 'windows',
    //                 type: 'submenu', // 加不加这个，都可以添加子菜单
    //                 role: 'windowMenu'

    //             }
    //         ]
    //     }
    // ];

    // 菜单图标（图标不存在时会报错）
    var icon = '';
    // 如果不是 Windows，使用 png 格式的图像
    if (process.platform != 'win32') {
        icon = './resource/images/1.jpg';
    } else {  //  如果是 Windows，使用 ico 格式的图像
        icon = './resource/images/2.jpg';
    }
    template = [
        {
            label: '文件',
            submenu: [
                {
                    label: '打开',
                    icon: icon  // 设置“打开”菜单项的图标
                },
                {
                    label: '重做',
                    role: 'redo'
                }
            ]
        }
    ];

    // 创建菜单对象
    const menu = Menu.buildFromTemplate(template);
    // 安装应用
    Menu.setApplicationMenu(menu);

    // 创建 Tray 对象，并指定托盘图标
    tray = new Tray('./resource/images/1.jpg');
    // 创建用于托盘图标的上下文菜单
    // 在 Windows 下，使用 role 设置菜单项的预定功能不起作用（作为应用菜单可以），
    // 因此如果将上下文菜单作为托盘图标的菜单，应该尽量使用 click 属性设置单击事件函数
    contextMenu = Menu.buildFromTemplate([
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '剪切', role: 'cut' },
        { label: '关闭', role: 'close', click: () => { win.close() } }
    ])
    // 设置托盘图标的提示文本
    tray.setToolTip('这是第一个托盘应用')
    // 将托盘图标与上下文菜单关联
    tray.setContextMenu(contextMenu)

    // 右击弹出菜单
    tray.on('right-click', (event) => {
        tray.popUpContextMenu(contextMenu);
    });

    //关闭当前窗口后触发 closed 事件
    win.on('closed', () => {
        console.log('closed');
        win = null;
    })
    // 打开调试窗口
    win.webContents.openDevTools()
    console.log('createWindow end...')
}
// Electron 初始化完成后触发 ready 事件 
app.on('ready', createWindow)
// 所有的窗口关闭后触发 window-all-closed 事件
app.on('window-all-closed', () => {
    console.log('window-all-closed');
    // 非 Mac OS X 平台，直接调用 app.quit() 方法退出程序
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
//窗口激活后触发 activate 事件
app.on('activate', () => {
    console.log('activate');
    if (win === null) {
        createWindow();
    }
})
