const remote = require('electron').remote;
const dialog = remote.dialog;
var spawn = require('child_process').execFile;

function onload() {
  //如果是 Windows 平台，禁用 mac 选项
  if (process.platform == 'win32') {
    mac.disabled = true;
  }
}
//选择 Electron 工程目录
function onClick_SelectProject() {
  var options = {};
  options.title = '选择Electron工程目录';
  options.properties = ['openDirectory'];
  label_source.innerText = dialog.showOpenDialog(options)
}
//选择输出目录
function onClick_SelectOut() {
  var options = {};
  options.title = '选择输出目录';
  options.properties = ['openDirectory', 'createDirectory'];
  //  显示打开目录对话框
  label_out.innerText = dialog.showOpenDialog(options)
}
//开始打包
function onClick_Package() {
  //根据用户的选择和输入，生成 electron-packager 的命令行参数
  const args = [];
  //设置打包需要的各种参数
  args.push(label_source.innerText);
  args.push(appName.value);
  args.push('--out=' + label_out.innerText);
  args.push('--electron-version=3.0.2');
  if (asar.checked) {
    args.push('--asar');
  }
  var os = '';
  //检测是否要为苹果生成打包文件
  if (mac.checked) {
    os += 'darwin';
  }
  //检测是否要为 Windows 生成打包文件
  if (windows.checked) {
    if (os != '') {
      os += ',';
    }
    os += 'win32';
  }
  //检测是否要为 Linux 生成打包文件
  if (linux.checked) {
    if (os != '') {
      os += ',';
    }
    os += 'linux';
  }
  //设置操作系统平台
  if (os != '') {
    args.push('--platform=' + os);
  }
  var cmd = 'electron-packager';
  //如果是 Windows，应该执行 electron-packager.cmd
  if (process.platform == 'win32') {
    cmd += '.cmd';
  }
  //开始执行 electron-packager 命令打包 Electron 应用
  const e = spawn(cmd, args, (error, stdout, stderr) => {
    //打包出错
    if (error) {
      console.error('stderr', stderr);
    } else {  //打包成功
      packager_status.innerText = '打包成功';
    }

  })
  packager_status.innerText = '正在打包，请稍后...';
}