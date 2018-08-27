import { fromJS, List } from 'immutable';

const initialState = fromJS({
  boxes: List(),
});

export default function (state = initialState, action) {
	switch (action.type) {

    case 'box-create': {
      return state.update('boxes', (boxes) => {
        return boxes.push(fromJS(action.payload))
      });
    }

		default: {
			return state;
		}
	}
}
