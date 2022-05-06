const cdwReducer = (cast = [{}], action) => {
	switch (action.type) {
		case 'getCDWDetails':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return cast;
	}
}

export default cdwReducer;