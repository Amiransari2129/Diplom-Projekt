const extendedCastReducer = (cast = [{}], action) => {
	switch (action.type) {
		case 'getExtendedCastDetails':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return cast;
	}
}

export default extendedCastReducer;

