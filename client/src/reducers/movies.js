const movieReducer = (movies = [], action) => {
	switch (action.type) {
		case 'getFilteredMovies':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return movies;
	}
}

export default movieReducer;