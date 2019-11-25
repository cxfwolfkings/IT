const template = [{
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