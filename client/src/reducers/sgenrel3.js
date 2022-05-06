const genre3Reducer = (genreList = [], action) => {
	switch (action.type) {
		case 'sgenrel3':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return genreList;
	}
}

export default genre3Reducer;