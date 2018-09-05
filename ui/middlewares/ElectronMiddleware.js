import { boxes } from 'ui/Box/BoxSelectors';

export default (store) => (next) => (action) => {
  switch(action.type) {
    case 'serialize-boxes': {
      const state = store.getState();

      window.ipcRenderer.send('serialize-boxes', boxes(state).toJS());
    }

    default: {
      next(action);
    }
  }

}
