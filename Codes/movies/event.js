const electron = require('electron')
const fs = require('fs');
let sql = require('./sql.js');
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql');

const { app, BrowserWindow, ipcRenderer } = electron
const remote = electron.remote;
const dialog = remote.dialog;
const ipcMain = remote.ipcMain;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
// 在 Renderer 进程中需要使用 remote 获取 nativeImage、Tray 和 clipboard
const Tray = remote.Tray;
const nativeImage = remote.nativeImage;
const clipboard = remote.clipboard;

// 在内存中创建数据库
let db = new sql.Database();
let db1;
let conn;

let tray;
let contextMenu
let photoData;
let video;

ipcMain.on('close', (event, str) => {
    alert(str);
});

let win;

/**
 * 文件对话框
 */
function onClick_OpenFile() {
    const label = document.getElementById('label');
    // 显示打开文件对话框，并将选择的文件显示在页面上
    label.innerText = dialog.showOpenDialog({ properties: ['openFile'] })
}

/**
 * 定制对话框
 */
function onClick_CustomOpenFile() {
    const label = document.getElementById('label');
    var options = {};
    // 设置 Windows 版打开对话框的标题
    options.title = '打开文件';
    // 设置 Mac OS X 版本打开对话框的标题
    options.message = '打开我的文件';
    // 设置按钮的文本
    options.buttonLabel = '选择';
    // 设置打开文件对话框的默认路径（当前目录）
    options.defaultPath = '.';
    options.properties = ['openFile'];
    label.innerText = dialog.showOpenDialog(options)
}

/**
 * 选择指定类型的文件
 */
function onClick_FileType() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '打开文件';
    options.buttonLabel = '选择';
    options.defaultPath = '.';
    options.properties = ['openFile'];
    // 指定特定的文件类型
    options.filters = [
        { name: '图像文件', extensions: ['jpg', 'png', 'gif'] },
        { name: '视频文件', extensions: ['mkv', 'avi', 'mp4'] },
        { name: '音频文件', extensions: ['mp3', 'wav'] },
        { name: '所有文件', extensions: ['*'] }
    ]
    label.innerText = dialog.showOpenDialog(options)
}

/**
 * 打开和创建目录
 */
function onClick_OpenAndCreateDirectory() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '打开目录';
    //  createDirectory仅用于Mac OS 系统
    options.properties = ['openDirectory', 'createDirectory'];
    label.innerText = dialog.showOpenDialog(options)
}

/**
 * 选择多个文件和目录，需要为 properties 属性指定 'multiSelections' 值，
 * 不过 Mac OS X 和 Windows 的表现有些不太一样。
 * 
 * 如果要想同时选择多个文件和目录，
 * 在 Mac OS X 下需要同时为 properties 属性指定 'openFile' 和 'openDirectory'，
 * 而在 Windows 下，只需要为 properties 属性指定 'openFile' 即可。
 * 
 * 如果在 Windows 下指定了 'openDirectory'，不管是否指定 'openFile'，
 * 都只能选择目录，而不能显示文件（对话框中根本就不会显示文件），
 * 所以如果要让 Mac OS X 和 Windows 都能同时选择文件和目录，
 * 需要单独考虑每个操作系统
 */
function onClick_MultiSelection() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '选择多个文件和目录';
    options.message = '选择多个文件和目录';
    //  添加多选属性和打开文件属性
    options.properties = ['openFile', 'multiSelections'];
    //  如果是Mac OS X，添加打开目录属性
    if (process.platform === 'darwin') {
        options.properties.push('openDirectory');
    }
    label.innerText = dialog.showOpenDialog(options)
}

/**
 * 通过回调函数返回选择结果
 */
function onClick_Callback() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '选择多个文件和目录';
    options.message = '选择多个文件和目录';

    options.properties = ['openFile', 'multiSelections'];
    if (process.platform === 'darwin') {
        options.properties.push('openDirectory');
    }
    //  指定回调函数，在回调函数中通过循环获取选择的多个文件和目录
    dialog.showOpenDialog(options, (filePaths) => {
        for (var i = 0; i < filePaths.length; i++) {
            label.innerText += filePaths[i] + '\r\n';
        }

    });
}


/**
 * 保存对话框
 */
function onClick_Save() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '保存文件';
    options.buttonLabel = '保存';
    options.defaultPath = '.';
    //Only Mac OS X，输入文件名文本框左侧的标签文本
    options.nameFieldLabel = '请输入要保存的文件名';
    //是否显示标记文本框，默认值为True
    //options.showsTagField = false;
    //设置要过滤的图像类型  
    options.filters = [
        { name: '图像文件', extensions: ['jpg', 'png', 'gif'] },
        { name: '视频文件', extensions: ['mkv', 'avi', 'mp4'] },
        { name: '音频文件', extensions: ['mp3', 'wav'] },
        { name: '所有文件', extensions: ['*'] }
    ]
    //显示保存文件对话框，并将返回的文件名显示页面上
    label.innerText = dialog.showSaveDialog(options)
}

function onClick_SaveCallback() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '保存文件';
    options.buttonLabel = '保存';
    options.defaultPath = '.';
    //  Only Mac OS X
    options.nameFieldLabel = '请输入要保存的文件名';
    // 
    options.showsTagField = false;
    options.filters = [
        { name: '图像文件', extensions: ['jpg', 'png', 'gif'] },
        { name: '视频文件', extensions: ['mkv', 'avi', 'mp4'] },
        { name: '音频文件', extensions: ['mp3', 'wav'] },
        { name: '所有文件', extensions: ['*'] }
    ]
    dialog.showSaveDialog(options, (filename) => {
        label.innerText = filename;
    })
}

/**
 * 默认对话框：none
 * 信息对话框：info
 * 错误对话框：error
 * 询问对话框：question
 * 警告对话框：warning
 */
function onClick_MessageBox() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '信息';
    options.message = '这是一个信息提示框';

    // 设置对话框的图标
    // options.icon = '../../../images//note.png';

    // 设置对话框类型
    // options.type = 'warning';  

    // 设置对话框的按钮
    // 在 Mac OS X 下，添加的按钮从右向左显示。
    // 在 Windows 下，从上到下显示
    // options.buttons = ['按钮1','按钮2','按钮3','按钮4','按钮5']

    label.innerText = dialog.showMessageBox(options)

    // 获取单击按钮的索引，并将索引输出到控制台
    // dialog.showMessageBox(options,(response) => {
    //     console.log('当前被单击的按钮索引是' + response);
    // })
}

/**
 * 显示错误对话框
 */
function onClick_ErrorBox() {
    var options = {};
    options.title = '错误';
    options.content = '这是一个错误'
    dialog.showErrorBox('错误', '这是一个错误');
}

function onClick_OpenWindow() {
    // 通过 open 方法指定窗口的标题时，子窗口不能设置 <title> 标签
    win = window.open('./child.html', '新的窗口', 'width=300,height=200')
}

// 获得焦点
function onClick_Focus() {
    if (win != undefined) {
        win.focus();
    }
}
// 失去焦点
function onClick_Blur() {
    if (win != undefined) {
        win.blur();
    }
}

// 关闭子窗口
function onClick_Close() {
    if (win != undefined) {
        //  closed 属性用于判断窗口是否已关闭
        if (win.closed) {
            alert('子窗口已经关闭，不需要再关闭');
            return;
        }
        win.close();
    }
}

// 调用子窗口中的打印对话框
function onClick_PrintDialog() {
    if (win != undefined) {
        win.print();
    }
}

/**
 * 其中 postMessage 方法的第 1 个参数用于指定要传递的数据，
 * 第 2 个参数是来源，一个字符串类型的值，如果不知道来源，可以使用 '*'。
 */
function onClick_Message() {
    // 向 win 指定的窗口传递数据
    win.postMessage('my data', '*');
}

var label
function child_onLoad() {
    label = document.getElementById('label');
    window.addEventListener('message', function (e) {
        alert(e.origin);
        label.innerText = e.data
    });
    console.log('onload end...')
}

function onClick_Close() {
    const win = remote.getCurrentWindow();
    ipcRenderer.send('close', '窗口已经关闭');
    win.close();
}

function onClick_Eval() {
    // 通过 eval 方法设置 child 窗口中的 label 标签
    win.eval('label.innerText="hello world"')
}

/**
 * 渲染当前网页（webFrame）
 */
function onClick_Resize_Test() {
    //让页面放大或缩小整数倍
    //webFrame.setZoomLevel(2)

    //让页面按一定级别放大和缩小，默认是 0（原始大小），没增加或减少 1，放大或缩小 20%，最大放大到 300%，最小缩小到原来的 50%
    webFrame.setZoomLevel(webFrame.getZoomLevel() + 1)

    console.log(webFrame.getZoomFactor())
    //在获得焦点的文本框中插入文本
    webFrame.insertText("hello world");
}

/**
 * 屏幕 API
 */
function onClick_Screen_Test() {
    const win = remote.getCurrentWindow();
    // 获取当前屏幕的宽度和高度（单位：像素）
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    win.setSize(width, height, true)
    console.log('width:' + width);
    console.log('height:' + height);
    win.setPosition(0, 0)
    // 获取鼠标的绝对坐标值
    console.log('x：' + electron.screen.getCursorScreenPoint().x)
    console.log('y：' + electron.screen.getCursorScreenPoint().y)
    console.log('菜单栏高度：' + electron.screen.getMenuBarHeight()) // Mac OS X
}

/**
 * 任务栏的进度条
 */
function onClick_Process_Test() {
    const win = remote.getCurrentWindow();
    win.setProgressBar(0.5)
}

function saveClick() {
    // 单击“保存”按钮后弹出一个窗口
    var win = new BrowserWindow({ width: 300, height: 200 });
    win.loadURL('https://geekori.com');
}

var customMenu = new Menu();

// 添加最初的应用菜单
function onClick_AllOriginMenu() {

    const menu = new Menu();
    var icon = '';
    if (process.platform != 'win32') {
        icon = '../../../images/open.png';
    } else {
        icon = '../../../images/folder.ico';
    }
    //  创建菜单项对应的 MenuItem 对象
    var menuitemOpen = new MenuItem({ label: '打开', icon: icon })
    var menuitemSave = new MenuItem({ label: '保存', click: saveClick })
    // 创建带子菜单的菜单项
    var menuitemFile = new MenuItem({ label: '文件', submenu: [menuitemOpen, menuitemSave] });
    // 创建用于定制的菜单项目
    menuitemCustom = new MenuItem({ label: '定制菜单', submenu: customMenu });

    menu.append(menuitemFile);
    menu.append(menuitemCustom);

    Menu.setApplicationMenu(menu);

}
//  动态添加菜单项
function onClick_AddMenuItem() {
    var type = 'normal';
    if (radio.checked) {
        type = 'radio';      // 设为单选风格的菜单项
    }
    if (checkbox.checked) {
        type = 'checkbox';  // 设为多选风格的菜单项
    }
    //  动态添加菜单项
    customMenu.append(new MenuItem({ label: menuitem.value, type: type }))
    menuitem.value = '';
    radio.checked = false;
    checkbox.checked = false;
    //  必须更新菜单，修改才能生效
    Menu.setApplicationMenu(Menu.getApplicationMenu());
}

function onLoad() {
    console.log('onload begin...')

    const webview = document.getElementById('other');
    webview.addEventListener('dom-ready', () => {
        /**
         * 使用方法之前 webview 元素必须已被加载。
         * console.log 方法只是在当前窗口的调试工具中输出日志，
         * 而不会在 webview.openDevTools 方法打开的调试工具中输出任何日志，
         * 除非使用 webview.executeJavaScript 方法在 <webview> 标签打开的页面中执行日志输出代码。
         */
        // 装载新的页面
        webview.loadURL('https://www.baidu.com');
        // 重新装载当前页面
        webview.reload();
        // 获取当前页面的标题
        console.log(webview.getTitle());
        // 获取当前页面对应的 URL
        console.log(webview.getURL());
        const title = webview.getTitle();
        // 在装载的页面执行 JavaScript 代码
        webview.executeJavaScript('console.log("' + title + '");')
        // 打开调试工具
        webview.openDevTools()
    })
    const loadstart = () => {
        console.log('loadstart');
    }
    const loadstop = () => {
        console.log('loadstop');
    }
    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)

    const menu = new Menu();
    var icon = '';
    if (process.platform != 'win32') {
        icon = './resource/images/1.jpg';
    } else {
        icon = './resource/images/2.jpg';
    }
    const win = remote.getCurrentWindow();
    // 添加上下文菜单项，单击菜单项，会弹出打开对话框，并将选择的文件路径设置为窗口标题
    var menuitemOpen = new MenuItem({
        label: '打开', icon: icon, click: () => {
            var paths = dialog.showOpenDialog({ properties: ['openFile'] });
            if (paths != undefined)
                win.setTitle(paths[0]);
        }
    });
    var menuitemSave = new MenuItem({ label: '保存', click: saveClick })

    var menuitemFile = new MenuItem({ label: '文件', submenu: [menuitemOpen, menuitemSave] });

    var menuitemInsertImage = new MenuItem({ label: '插入图像' });
    var menuitemRemoveImage = new MenuItem({ label: '删除图像' });

    menu.append(menuitemFile);
    menu.append(menuitemInsertImage);
    menu.append(menuitemRemoveImage);
    // 添加上下文菜单响应事件，只有单击鼠标右键，才会触发该事件
    panel.addEventListener('contextmenu', function (event) {
        // 阻止事件的默认行为，例如，submit 按钮将不会向 form 提交
        event.preventDefault();
        x = event.x;
        y = event.y;
        // 弹出上下文菜单
        menu.popup({ x: x, y: y });
        return false;
    });
    console.log('onload end...')
}

// 添加托盘图标
function onClick_AddTray() {
    if (tray != undefined) {
        return
    }
    tray = new Tray('./resource/images/1.jpg');
    var win = remote.getCurrentWindow();
    contextMenu = Menu.buildFromTemplate([
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '剪切', role: 'cut' },
        { label: '关闭', role: 'close', click: () => { win.close() } }
    ])
    /*
     为托盘图标添加鼠标右键单击事件，在该事件中，如果按住 shift 键，再单击鼠标右键，会弹出一个窗口，否则会弹出上下文菜单。
     如果为托盘图标绑定了上下文菜单，在 Windows 下不会响应该事件，这是因为 Windows 下是单击鼠标右键显示上下文菜单的，正好和这个 right-click 事件冲突。
     
     event 参数包括下面的属性，表明当前是否按了对应的键。
     1. altKey：Alt 键
     2. shiftKey：Shift 键
     3. ctrlKey：Ctrl 键
     4. metaKey：Meta 键，在 Mac OS X 下是 Command 键，在 Windows 下是窗口键（开始菜单键）
    */
    tray.on('right-click', (event) => {
        textarea.value += '\r\n' + 'right-click';
        if (event.shiftKey) {
            window.open('https://geekori.com', 'right-click', 'width=300,height=200')
        } else {
            // 单击鼠标右键弹出上下文菜单
            tray.popUpContextMenu(contextMenu);
        }
    });
    /*
     为托盘图标添加鼠标单击事件，在该事件中，如果按住 shift 键，再单击鼠标左键或右键，会弹出一个窗口，否则会弹出上下文菜单。
     如果将上下文菜单与托盘图标绑定，在 Mac OS X 下，单击鼠标左键不会触发该事件，这是由于 Mac OS X 下是单击鼠标左键弹出上下文菜单，与这个事件冲突
    */
    tray.on('click', (event) => {
        textarea.value += '\r\n' + 'click';
        if (event.shiftKey) {
            window.open('https://geekori.com', 'click', 'width=300,height=200')
        } else {
            // 单击鼠标右键弹出上下文菜单
            tray.popUpContextMenu(contextMenu);
        }
    });
    /*
     当任何东西拖动到托盘图标上时触发，读者可以从 word 中拖动文本到托盘图标上观察效果
     Only Mac OS X
   */
    tray.on('drop', () => {
        textarea.value += '\r\n' + 'drop';
    });
    /*
     当文件拖动到托盘图标上时会触发，files 参数是 String 类型数组，表示拖动到托盘图标上的文件名列表
     Only Mac OS X
    */
    tray.on('drop-files', (event, files) => {
        textarea.value += '\r\n' + 'drop-files';
        // 输出所有拖动到托盘图标上的文件路径
        for (var i = 0; i < files.length; i++) {
            textarea.value += files[i] + '\r\n';
        }
    });
    /*
     当文本拖动到托盘图标上时会触发，text 参数是 String 类型，表示拖动到托盘图标上的文本
     Only Mac OS X
    */
    tray.on('drop-files', (event, files) => {
        textarea.value += '\r\n' + 'drop-files';
        for (var i = 0; i < files.length; i++) {
            textarea.value += files[i] + '\r\n';
        }
    });

    /**
     * 其中 balloon-click 和 balloon-closed 是互斥的，
     * 也就是说，单击气泡消息后，气泡消息会立刻关闭，在这种情况下，并不会触发 balloon-closed 事件。
     * 因此 balloon-closed 事件只有当气泡消息自己关闭后才会触发，气泡消息在显示几秒后会自动关闭。
     */
    // 添加气泡消息显示事件
    tray.on('balloon-show', () => {
        log.value += 'balloon-show\r\n';
    });
    // 添加气泡消息单击事件
    tray.on('balloon-click', () => {
        log.value += 'balloon-click\r\n';
    });
    // 添加气泡消息关闭事件
    tray.on('balloon-closed', () => {
        log.value += 'balloon-closed\r\n';
    });

    tray.setToolTip('托盘事件')
    tray.setContextMenu(contextMenu)
}

// 设置托盘图像
function onClick_SetImage() {
    if (tray != undefined) {
        tray.setImage('./resource/images/1.jpg')
    }
}
// 设置托盘标题（仅适用于Mac OS X）
function onClick_SetTitle() {
    if (tray != undefined) {
        tray.setTitle('hello world')
    }
}
// 设置托盘按下显示的图标（仅适用于Mac OS X）
function onClick_SetPressedImage() {
    if (tray != undefined) {
        tray.setPressedImage('./resource/images/1.jpg')
    }
}
// 设置托盘提示文本
function onClick_SetTooltip() {
    if (tray != undefined) {
        tray.setToolTip('This is a tray')
    }
}
// 移除托盘
function onClick_RemoveTray() {
    if (tray != undefined) {
        tray.destroy();
        tray = undefined; // 应该将tray设为undefined，否则无法再创建托盘对象
    }
}

function onClick_DisplayBalloon() {
    if (tray != undefined) {
        // 显示气泡消息
        tray.displayBalloon({ title: '有消息了', icon: './resource/images/1.jpg', content: '软件有更新了，\r\n赶快下载啊' })
    }
}

function stopDefaultEvent(event) {
    event.preventDefault();
    return false;
}
// 必须设置，否则 ondrop 事件不会被触发
window.ondragover = stopDefaultEvent;

// 显示不同尺寸的图像
function displayImageInIconSet(filePath) {
    // 获取 div 下所有的 img 标签 
    var images = window.document.querySelectorAll('#icons img');
    // 在所有的 img 标签中显示同样的图像
    for (var i = 0; i < images.length; i++) {
        images[i].src = filePath;
    }
}
// 设置 div 样式
function displayIconsSet() {
    var iconsArea = window.document.querySelector('#icons');
    iconsArea.style.display = 'block';
}

function initDropEvent() {
    var loadiconholder = window.document.querySelector('#load-icon-holder');
    // 设置 div 的 ondrop 事件
    loadiconholder.ondrop = function (event) {
        event.preventDefault();
        if (event.dataTransfer.files.length !== 1) {
            alert('只能拖动一个图像文件.');
        } else {
            loadiconholder.style.display = 'none';
            displayIconsSet();
            var file = event.dataTransfer.files[0];
            // 显示不同尺寸的图像 
            displayImageInIconSet(file.path);
        }
        return false;
    };
}

//弹出对话框保存图像
function savePhoto(filePath) {
    if (filePath) {
        //向文件写入 base 64 格式的图像数据
        fs.writeFile(filePath, photoData, 'base64', (err) => {
            if (err) alert(`保存图像有问题: ${err.message}`);
            photoData = null;
        });
    }
}
//用于初始化视频流
function initCamera() {
    video = window.document.querySelector('video');
    let errorCallback = (error) => {
        console.log(`连接视频流错误: ${error.message}`);
    };

    window.navigator.webkitGetUserMedia({ video: true }, (localMediaStream) => {
        video.src = window.URL.createObjectURL(localMediaStream);
    }, errorCallback);
}
//拍照
function takePhoto() {
    let canvas = window.document.querySelector('canvas');
    //将当前的视频图像绘制在 canvas 上 
    canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
    //获取  base64 格式的图像数据
    photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    //显示保存对话框保存图像
    dialog.showSaveDialog({
        title: "保存图像",
        defaultPath: 'face.png',
        buttonLabel: '保存'
    }, savePhoto);
}

'use strict';
//动态创建 link 标签，并指定样式文件
function addStylesheet(stylesheet) {
    var head = document.getElementsByTagName('head')[0];
    //创建 link 标签
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    //设置 link 标签的 href 属性值
    link.setAttribute('href', stylesheet + '.css');
    //将 link 标签添加到 head 标签中
    head.appendChild(link);
}
//设置 span 标签，让该标签显示相应操作系统的名字
function labelOS(osName) {
    document.getElementById('os-label').innerText = osName;
}
//页面初始化时使用
function initOsStyle() {
    //导入 os 模块
    var os = require('os');
    //获取平台信息
    var platform = os.platform();
    //判断操作系统类型
    switch (platform) {
        case 'darwin':    //Mac OS X 系统
            addStylesheet('mac');
            labelOS('macOS');
            break;
        case 'linux':      //Linux 系统
            addStylesheet('linux');
            labelOS('Linux');
            break;
        case 'win32':     //Windows 系统
            addStylesheet('windows');
            labelOS('Microsoft Windows');
            break;
        default:
            console.log('无法检测您当前的操作系统平台', platform);
    }
}

//初始化页面
function initNote() {
    //从 localStorage 中获取保存的笔记
    let notes = window.localStorage.notes;
    if (!notes) notes = '记录生活的点点滴滴...';
    //将保存的笔记显示在文本输入区域
    textarea.value = notes;
}
function saveNotes() {
    let notes = textarea.value;
    //保存输入的笔记
    window.localStorage.setItem('notes', notes);
}
//退出笔记本
function quit() { app.quit(); }

//将内存中的数据库写到 test.db 文件中，callback 是回到函数
//用于处理写文件成功或失败的事件
function writeDBToDisk(callback) {
    var binaryArray = db.export();
    fs.writeFile("test.db", binaryArray, "binary", function (err) {
        if (err) {
            if (callback != undefined)
                callback(err);
        } else {
            if (callback != undefined)
                callback('成功保存数据库文件');
        }
    });
}
//创建数据库
function onClick_CreateDatabase() {
    //如果 test.db 文件存在，则删除该文件
    fs.exists('test.db', function (exists) {
        if (exists) {
            fs.unlinkSync('test.db');
        }
        //用于创建 t_products 表的 SQL 语句
        let createTableSQL = `create table if not exists t_products(
                          id integer primary key autoincrement,
                          product_name varchar(100) not null,
                          price float not null  )`;
        //运行 SQL 语句创建 t_products 表
        db.run(createTableSQL);
        //将数据库写到 test.db 文件中，并将相应的按钮置为可用状态
        writeDBToDisk((msg) => {
            button_create.disabled = true;
            button_insert.disabled = false;
            alert(msg);
        });

    });
}
//插入记录
function onClick_Insert() {
    if (db == undefined) return;
    let insertSQL = 'insert into t_products(product_name,price) select "iPhone10",10000 union all select "Android手机",8888 union all select "特斯拉",888888;'
    //向 t_products 表中插入 2 条记录
    db.run(insertSQL);
    //将插入记录后的数据库写到 test.db 文件中
    writeDBToDisk((msg) => {
        alert(msg);
        button_insert.disabled = true;
        button_query.disabled = false;
        button_update.disabled = false;
        button_delete.disabled = false;
    });
}
//查询 t_products 表中所有的记录
function onClick_Query() {
    if (db == undefined) return;
    let selectSQL = 'select * from t_products';
    var rows = db.exec("select * from t_products WHERE id<5");
    label_rows.innerText = '';
    //将查询结果显示在标签中
    for (var i = 0; i < rows[0].values.length; i++) {
        label_rows.innerText += '\r\n产品ID:' + rows[0].values[i][0] +
            '\r\n产品名称:' + rows[0].values[i][1] +
            '\r\n产品价格:' + rows[0].values[i][2] + '\r\n';
    }
}
//将 id 等于 3 的记录中的 price 字段值更新为 999999
function onClick_Update() {
    if (db == undefined) return;
    let updateSQL = 'update t_products set price = 999999 where id = 3';
    db.exec(updateSQL);
    writeDBToDisk((msg) => {
        alert(msg);
    });
}
//删除 id 等于 2 的记录
function onClick_Delete() {
    if (db == undefined) return;
    let deleteSQL = 'delete from t_products where id = 2';
    db.exec(deleteSQL);
    writeDBToDisk((msg) => {
        alert(msg);
    });
}

// 创建数据库
function onClick_CreateDatabase1() {
    fs.exists('test.db', function (exists) {
        if (exists) {
            fs.unlinkSync('test.db');
        }
        db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                alert(err.message);
            } else {
                alert('成功连接test.db数据库!');

                let createTableSQL = `create table if not exists t_products(
                          id integer primary key autoincrement,
                          product_name varchar(100) not null,
                          price float not null
                      )`;
                db.run(createTableSQL, function (err) {
                    if (err) {
                        alert(err.message);
                    } else {

                        button_create1.disabled = true;
                        button_insert1.disabled = false;

                    }
                });

            }
        });
    })
}
// 插入记录
function onClick_Insert1() {
    if (db == undefined) return;
    let insertSQL = 'insert into t_products(product_name,price) select "iPhone10",10000 union all select "Android手机",8888 union all select "特斯拉",888888;'
    db.run(insertSQL, function (err) {
        if (err) {
            alert(err.message);
        } else {
            alert('成功插入记录');
            button_insert1.disabled = true;
            button_query1.disabled = false;
            button_update1.disabled = false;
            button_delete1.disabled = false;
        }
    });
}
// 查询记录
function onClick_Query1() {
    if (db == undefined) return;
    let selectSQL = 'select * from t_products';
    db.all(selectSQL, [], function (err, rows) {
        if (err) {
            alert(err.message);
        } else {
            label_rows.innerText = '';
            for (var i = 0; i < rows.length; i++) {
                label_rows.innerText += '\r\n产品ID:' + rows[i].id +
                    '\r\n产品名称:' + rows[i].product_name +
                    '\r\n产品价格:' + rows[i].price + '\r\n';
            }
        }
    });
}
// 更新记录
function onClick_Update() {
    if (db == undefined) return;
    let updateSQL = 'update t_products set price = 999999 where id = 3';
    db.run(updateSQL, function (err) {
        if (err) {
            alert(err.message);
        } else {
            alert('成功更新记录');
        }
    });
}
// 删除记录
function onClick_Delete1() {
    if (db == undefined) return;
    let deleteSQL = 'delete from t_products where id = 2';
    db.run(deleteSQL, function (err) {
        if (err) {
            alert(err.message);
        } else {
            alert('成功删除记录');
        }
    });
}

// 打开 MySQL 数据库
function onClick_OpenDatabase2() {
    conn = mysql.createConnection({
        host: '127.0.0.1',
        user: "root", //数据库用户名
        password: "12345678", //数据库密码
        database: "cloudnote", //数据库
        port: 3306
    });
    const createTableSQL = `create table if not exists t_products(
                          id integer primary key auto_increment,
                          product_name varchar(100) not null,
                          price float not null  )`;
    // 创建 t_products 表
    conn.query(createTableSQL, function (err, result) {
        if (err) console.log(err);
        else {
            const clearSQL = 'delete from t_products';
            conn.query(clearSQL, [], function (err, result) {
                alert('成功打开MySQL数据库');
                button_create2.disabled = true;
                button_insert2.disabled = false;
            });
        }
    });
}
// 插入记录
function onClick_Insert2() {
    if (conn == undefined) return;
    let insertSQL = 'insert into t_products(product_name,price) select "iPhone10",10000 union all select "Android手机",8888 union all select "特斯拉",888888;'
    conn.query(insertSQL, function (err, result) {
        if (err) console.log(err);
        else {
            alert('成功向t_products表插入记录');
            button_insert2.disabled = true;
            button_query2.disabled = false;
            button_update2.disabled = false;
            button_delete2.disabled = false;
        }
    });
}
// 查询记录
function onClick_Query2() {
    if (conn == undefined) return;
    let selectSQL = 'select * from t_products';
    conn.query(selectSQL, function (err, result) {
        if (err) console.log(err);
        else {
            label_rows.innerText = '';
            for (var i = 0; i < result.length; i++) {
                label_rows.innerText += '\r\n产品ID:' + result[i].id +
                    '\r\n产品名称:' + result[i].product_name +
                    '\r\n产品价格:' + result[i].price + '\r\n';
            }
        }
    });
}
// 更新记录
function onClick_Update2() {
    if (conn == undefined) return;
    let updateSQL = 'update t_products set price = 999999 where product_name = "特斯拉"';
    conn.query(updateSQL, function (err, result) {
        if (err) console.log(err);
        else {
            alert('成功更新记录');
        }
    });
}
// 删除记录
function onClick_Delete2() {
    if (conn == undefined) return;
    let deleteSQL = 'delete from t_products where product_name = "iPhone10"';
    conn.query(deleteSQL, function (err, result) {
        if (err) console.log(err);
        else {
            alert('成功删除记录');
        }
    });
}

function initClipboard() {
    //为 div 标签设置初始化的内容
    text.innerHTML = '<h1>hello world</h1>'
}
//向剪贴板写入文本
function onClick_WriteText() {
    clipboard.writeText(text.innerHTML);
    alert('已经成功将文本复制到剪贴板！')
}
//从剪贴板读取文本
function onClick_ReadText() {
    text.innerHTML = text.readText();
}
//向剪贴板写入 HTML 代码
function onClick_WriteHTML() {
    clipboard.writeHTML(text.innerHTML);
    alert('已经成功将HTML复制到剪贴板！')
}
//从剪贴板读取 HTML 代码
function onClick_ReadHTML() {
    alert(clipboard.readHTML())
    text.innerHTML = clipboard.readHTML();
}
//向剪贴板写入 RTF 代码
function onClick_WriteRTF() {
    clipboard.writeRTF(text.innerHTML);
    alert('已经成功将RTF复制到剪贴板！')
}
//从剪贴板读取 RTF 代码
function onClick_ReadRTF() {
    text.innerText = clipboard.readRTF();
    alert(clipboard.readRTF())
}
//将本地图像文件保存在剪贴板
function onClick_WriteImage() {
    const image = nativeImage.createFromPath('./images/pythonbook.png');
    clipboard.writeImage(image);
    alert('已经成功将Image复制到剪贴板！')
}
//从剪贴板读取图像
function onClick_ReadImage() {
    const image = clipboard.readImage()
    const appIcon = new Tray(image)
    console.log(appIcon)
}

window.onload = function () {
    initDropEvent();
    initCamera();
    initOsStyle();
    initNote();
    initClipboard();
};
