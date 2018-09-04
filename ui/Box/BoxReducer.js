import { fromJS, Map } from 'immutable';

const initialState = fromJS({
  boxes: Map(),
});

export default function (state = initialState, action) {
	switch (action.type) {

    case 'box-create': {
      return state.update('boxes', (boxes) => {
        return boxes.set(action.payload.id, fromJS(action.payload));
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




		default: {
			return state;
		}
	}
}
