import { fromJS } from 'immutable';

const serializedBoxes = window.serializedBoxes || {};

let lastBoxId = Math.max(...Object.keys(serializedBoxes), 0);

const initialState = fromJS({
  boxes: fromJS(serializedBoxes),
  hideBoxes: false,
  hideBoxesControls: true,
});

export default function (state = initialState, action) {
	switch (action.type) {

    case 'box-create': {
      return state.update('boxes', (boxes) => {
        const id = String(++lastBoxId);
        return boxes.set(id, fromJS({...action.payload, id}));
      });
    }

    case 'box-remove': {
      return state.update('boxes', (boxes) => {
        return boxes.remove(action.payload.id);
      });
    }

    case 'box-update': {
      const { id } = action.payload;

      return state.update('boxes', (boxes) => {
        let box = boxes.get(id);

        for(const key in action.payload) {
          box = box.set(key, action.payload[key]);
        }
        return boxes.set(id, box);
      });
    }

    case 'set-boxes-visibility': {
      return state.set('hideBoxes', action.payload);
    }
    case 'set-boxes-controls-visibility': {
      return state.set('hideBoxesControls', action.payload);
    }



		default: {
			return state;
		}
	}
}
