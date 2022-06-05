import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
	uid: String,
	Watchlist: {
		type: Array, "default": [{
			movieid: String,
			image_url: String,
			added: Date,
		}]
	},
	date: Date,
});

const Watchlist = mongoose.model('watchlist', watchlistSchema, 'watchlist');

export default Watchlist;