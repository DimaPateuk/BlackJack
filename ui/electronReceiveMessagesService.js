import store from 'ui/store';
import { predictionDone } from 'ui/DetectedResult/DetectedResultAction'
import lablesMap from 'detector/lablesMap';
console.log(lablesMap);
const ipcRenderer = window.ipcRenderer || {
  on: () => {},
};


var cardIndex = [
  'A',2,3,4,5,6,7,8,9,10,'J','D','K',
];

var cardSuit = [
  'spade',
  'heart',
  'club',
  'diamond',
];

class ElectronReceiveMessagesService {
  constructor () {
    ipcRenderer.on('prediction-done', this.predictionDoneHandler);
  }

  predictionDoneHandler = (e, data) => {
    const { predictionResult } = data;
    const result = predictionResult.map(({ prediction }) => {
      const lable = `${prediction} ${lablesMap[prediction]}`;

      return lable;
    });
    console.log(result);
    store.dispatch(predictionDone({ predictionResult: result}))

  }
}


export default new ElectronReceiveMessagesService();
