import store from 'ui/store';
import { predictionDone } from 'ui/DetectedResult/DetectedResultAction'
import lablesMap from 'detector/lablesMap';
console.log(lablesMap);
const ipcRenderer = window.ipcRenderer || {
  on: () => {},
};

class ElectronReceiveMessagesService {
  constructor () {
    ipcRenderer.on('prediction-done', this.predictionDoneHandler);
  }

  predictionDoneHandler = (e, data) => {
    const { predictionResult } = data;
    const result = predictionResult.map(({ key, lable }) => {
      const result = `${lable}`;

      return result;
    });
    console.log(result);
    store.dispatch(predictionDone({ predictionResult: result}))

  }
}


export default new ElectronReceiveMessagesService();
