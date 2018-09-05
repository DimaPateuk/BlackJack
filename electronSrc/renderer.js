const { ipcRenderer } = require('electron');

window.ipcRenderer = ipcRenderer;


try {
  const serializedBoxes = require('./serializedBoxes.json');

  window.serializedBoxes = serializedBoxes;



} catch (w) {
  window.serializedBoxes = {};
}
