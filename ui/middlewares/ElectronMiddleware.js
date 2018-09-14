import { boxes } from 'ui/Box/BoxSelectors';

const ipcRenderer = window.ipcRenderer || {
  send: () => {},
};

export default (store) => (next) => (action) => {
  switch(action.type) {
    case 'serialize-boxes': {
      const state = store.getState();

      return ipcRenderer.send('serialize-boxes', boxes(state).toJS());

    }

    case 'save-boxes-as-picture': {
      const state = store.getState();

      return ipcRenderer.send('save-boxes-as-picture', boxes(state).toJS());
    }

    default: {
      return next(action);
    }
  }

}
