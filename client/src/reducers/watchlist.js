const watchlistReducer = (watchlist = [], action) => {
	switch (action.type) {
		case 'getWatchlist':
			return action.payload;
		case 'error':
			return action.error;
		default:
			return watchlist;
	}
}

export default watchlistReducer;