const path = require('path');
const { app, BrowserWindow, ipcMain  } = require('electron');

// let {ipcRenderer} = require('electron');

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //transparent: true,
    //frame: false,
  });
  // mainWindow.loadURL('http://localhost:9000/index.html');
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'));

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
