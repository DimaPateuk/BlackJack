import { createAction } from 'redux-actions';


export const setBoxesVisibility = createAction('set-boxes-visibility');
export const setBoxesControlsVisibility = createAction('set-boxes-controls-visibility');



export const hideBoxes = () => setBoxesVisibility(true);
export const showBoxes = () => setBoxesVisibility(false);

export const hideBoxesControl = () => setBoxesControlsVisibility(true);
export const showBoxesControl = () => setBoxesControlsVisibility(false);


export const serializeBoxs = createAction('serialize-boxes');
export const saveBoxesAsPicture = createAction('save-boxes-as-picture');
