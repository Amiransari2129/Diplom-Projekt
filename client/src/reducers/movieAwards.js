const awardsReducer = (movies = [], action) => {
	switch (action.type) {
		case 'getMovieAwards':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return movies;
	}
}

export default awardsReducer;