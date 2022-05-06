const earningsReducer = (cast = [{}], action) => {
	switch (action.type) {
		case 'getEarningsDetails':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return cast;
	}
}

export default earningsReducer;