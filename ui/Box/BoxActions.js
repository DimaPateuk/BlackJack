export function createBox () {
	return {
		type: 'box-create',
		payload: {
			x: 0,
			y: 0,
			height: 100,
			width: 100,
		},
	};
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
