
let boxesIDs = 0;
export function createBox () {
	return {
		type: 'box-create',
		payload: {
			id: ++boxesIDs,
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