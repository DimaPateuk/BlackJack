import { fromJS } from 'immutable';

const initialState = fromJS({
	prediction: []
});

export default function (state = initialState, action) {
	switch (action.type) {

		case 'predictionDone': {
			const { predictionResult } = action.payload;
			return state.set('prediction', fromJS(predictionResult));
		}


		default: {
			return state;
		}
	}
}
