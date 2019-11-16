const remote = require('electron').remote;
const dialog = remote.dialog;

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
    label.innerText= dialog.showOpenDialog(options)
}

/**
 * 选择指定类型的文件
 */
function onClick_FileType(){
    const label = document.getElementById('label');
    var options = {};
    options.title = '打开文件';
    options.buttonLabel = '选择';
    options.defaultPath = '.';
    options.properties = ['openFile'];
    // 指定特定的文件类型
    options.filters = [
        {name: '图像文件', extensions: ['jpg', 'png', 'gif']},
        {name: '视频文件', extensions: ['mkv', 'avi', 'mp4']},
        {name: '音频文件', extensions: ['mp3','wav']},
        {name: '所有文件', extensions: ['*']}
    ]
    label.innerText= dialog.showOpenDialog(options)
}

/**
 * 打开和创建目录
 */
function onClick_OpenAndCreateDirectory() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '打开目录';
    //  createDirectory仅用于Mac OS 系统
    options.properties = ['openDirectory','createDirectory'];
    label.innerText= dialog.showOpenDialog(options)
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
    options.properties = ['openFile','multiSelections'];
    //  如果是Mac OS X，添加打开目录属性
    if (process.platform === 'darwin') {
        options.properties.push('openDirectory');
    }
    label.innerText= dialog.showOpenDialog(options)
}

/**
 * 通过回调函数返回选择结果
 */
function onClick_Callback() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '选择多个文件和目录';
    options.message = '选择多个文件和目录';

    options.properties = ['openFile','multiSelections'];
    if (process.platform === 'darwin') {
        options.properties.push('openDirectory');
    }
   //  指定回调函数，在回调函数中通过循环获取选择的多个文件和目录
    dialog.showOpenDialog(options,(filePaths) =>{
        for(var i = 0; i < filePaths.length;i++) {
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
        {name: '图像文件', extensions: ['jpg', 'png', 'gif']},
        {name: '视频文件', extensions: ['mkv', 'avi', 'mp4']},
        {name: '音频文件', extensions: ['mp3','wav']},
        {name: '所有文件', extensions: ['*']}
    ]
    //显示保存文件对话框，并将返回的文件名显示页面上
    label.innerText= dialog.showSaveDialog(options)
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
        {name: '图像文件', extensions: ['jpg', 'png', 'gif']},
        {name: '视频文件', extensions: ['mkv', 'avi', 'mp4']},
        {name: '音频文件', extensions: ['mp3','wav']},
        {name: '所有文件', extensions: ['*']}
    ]
    dialog.showSaveDialog(options,(filename) => {
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

    label.innerText= dialog.showMessageBox(options)

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
