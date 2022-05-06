const genre2Reducer = (genreList = [], action) => {
	switch (action.type) {
		case 'sgenrel2':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return genreList;
	}
}

export default genre2Reducer;