const { ipcRenderer, remote } = require('electron');
window.ipcRenderer = ipcRenderer;
window.remote = remote;


try {
  const serializedBoxes = require('./serializedBoxes.json');

  window.serializedBoxes = serializedBoxes;

} catch (w) {
  window.serializedBoxes = {};
}
