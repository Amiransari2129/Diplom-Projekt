const profileReducer = (profile = [], action) => {
	switch (action.type) {
		case 'getProfile':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return profile;
	}
}

export default profileReducer;