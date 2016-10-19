'use strict';
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const windowOptions = {
	transparent: true,
	frame: false,
	width: 1000,
	height: 1000,
	x: 0,
	y: 0
}

app.on('ready', () => {
	let win = new BrowserWindow(windowOptions)
	win.loadURL(`file://${__dirname}/index.html`)
	win.show()
});
app.on('window-all-closed', () => {
	app.quit();
})
