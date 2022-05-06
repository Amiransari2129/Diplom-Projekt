const fmovieReducer = (movies = [], action) => {
	switch (action.type) {
		case 'getfeaturedMovies':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return movies;
	}
}

export default fmovieReducer;