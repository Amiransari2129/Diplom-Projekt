const genre1Reducer = (genreList = [], action) => {
	switch (action.type) {
		case 'sgenrel1':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return genreList;
	}
}

export default genre1Reducer;