const { app, globalShortcut, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 840,
    height: 470,
    useContentSize: true
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
  //注册全局快捷键，在 Mac OS X 下是 <Comand+P>，在 Windows 和 Linux 下是 <Control+P>
  const pauseKey =
    globalShortcut.register('CommandOrControl+P', () => {
      //向Renderer进程发送消息，要求暂停或开始游戏
      mainWindow.webContents.send('togglePauseState');
    });
  //判断注册全局快捷键是否失败
  if (!pauseKey) alert('不同通过键盘暂停游戏');
});

app.on('will-quit', () => {
  globalShortcut.unregister('CommandOrControl+P');
});