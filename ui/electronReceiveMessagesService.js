import store from 'ui/store';

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

  predictionDoneHandler = (predictionResult, data) => {
    data.forEach(({prediction}) => {
      const lable = `${cardIndex[prediction % 13]}_${cardSuit[Math.floor(prediction / 14)]}`;
      alert(lable);

    })
  }
}


export default new ElectronReceiveMessagesService();
