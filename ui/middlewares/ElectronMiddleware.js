
export default (store) => (next) => (action) => {
  console.log(window.ipcRenderer);


  switch(action.type) {
    case 'serialize-boxes': {
      const state = store.getState();
      console.log(state.getIn(['box', 'boxes']).toJS());
    }

    default: {
      next(action);
    }
  }

}
