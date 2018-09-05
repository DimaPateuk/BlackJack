import { boxById } from 'ui/Box/BoxSelectors';

export function createBox (data = {}) {
	return {
		type: 'box-create',
		payload: {
			x: 0,
			y: 0,
			height: 100,
			width: 100,
			...data
		},
	};
}

export function cloneBox (id) {
	return (dispatch, getState) => {
		const initialBox = boxById(getState(), { id });
		const width = initialBox.get('width');
		dispatch(createBox({
			height: initialBox.get('height'),
			width,
			x: initialBox.get('x') + width + 10,
			y: initialBox.get('y'),
		}));
	}
}

export function removeBox (id) {
	return {
		type: 'box-remove',
		payload: {
			id,
		},
	};
}

export function updateBox (id, data) {
	return {
		type: 'box-update',
		payload: {
			id,
			...data
		}
	};
}
