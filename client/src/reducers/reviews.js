const reviewReducer = (reviews = [], action) => {
	switch (action.type) {
		case 'getMovieReviews':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return reviews;
	}
}

export default reviewReducer;