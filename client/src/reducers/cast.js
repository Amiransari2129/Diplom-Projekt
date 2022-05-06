const castReducer = (cast = [{}], action) => {
	switch (action.type) {
		case 'getCastDetails':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return cast;
	}
}

export default castReducer;