const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain  } = require('electron');
const PredictionService = require('./PredictionService');


let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    fullscreen: true,
  });
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'));

  mainWindow.webContents.openDevTools()
  mainWindow.setFullScreen(true);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });


  ipcMain.on('serialize-boxes', (event, arg) => {
    fs.writeFile(path.resolve(__dirname, 'serializedBoxes.json'), JSON.stringify(arg));
  });

  ipcMain.on('save-boxes-as-picture', (event, boxes) => {
    const [winX, winY] = mainWindow.getPosition();

    PredictionService.init({
      winX, winY, boxes
    });

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
