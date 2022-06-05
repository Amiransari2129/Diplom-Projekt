import Movies from '../models/Movies.js';
import Watchlist from '../models/Watchlist.js'

export const getMovie = async (req, res, next) => {
	const { id } = req.params;
	try {
		const moviesDetails = await Movies.findOne({ imdb_id: id });
		return res.status(200).json(moviesDetails);
	} catch (error) {
		return res.status(404).json({ success: false, message: 'Could not get movie' });
	}
}

export const filterMovies = async (req, res, next) => {
	const { filterKey, catKey } = req.body;

	const skip = parseInt(req.query.skip)
	const limit = parseInt(req.query.limit)

	const start = (skip - 1) * limit

	if (!filterKey || !catKey) {
		return res.status(400).json({ success: false, message: 'Please provide valid search information' });
	}

	let query = '';
	switch (catKey) {
		case 'year':
			query = { 'year': { '$eq': filterKey } };
			break;
		case 'title':
			query = { title: { $regex: new RegExp(filterKey, 'i') } }
			break;
		case 'genre':
			query = { 'gen.id': { '$eq': Number(filterKey) } };
			break;
		case 'rating':
			query = { 'rating': { '$lte': parseFloat(filterKey) } };
			break;
		default:
			break;
	};

	const filter = {
		title: 1,
		imdb_id: 1,
		year: 1,
		rating: 1,
		popularity: 1,
		image_url: 1,
		movie_length: 1,
		banner: 1,
	};

	try {
		let filteredMovies = {};
		if (catKey === 'rating') {
			filteredMovies.results = await Movies.find(query, filter).sort({ rating: -1 }).skip(start).limit(limit);
		} else {
			filteredMovies.results = await Movies.find(query, filter).sort({ popularity: 1 }).skip(start).limit(limit);
		}

		if (filteredMovies.length <= 0) {
			return res.status(404).json({ success: false, message: 'Could not find what you were searching for' });
		}

		filteredMovies.pageNumber = await Movies.find(query, filter).countDocuments() / limit;
		filteredMovies.skipValue = skip;
		filteredMovies.filterKey = filterKey;
		res.status(200).json(filteredMovies);
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Something went wrong try again' });
	}
}

export const addWatchlater = async (req, res, next) => {
	const { username, movieid, image_url, added, title } = req.body;

	if (!username || !movieid) {
		return res.status(400).json({ success: false, message: 'Could not add movie to watchlist' });
	}

	try {
		const isThere = await Watchlist.findOne({ uid: username });

		if (!isThere) {
			const watchlater = await Watchlist.create({
				uid: username, Watchlist: { movieid, image_url, added, title }
			});
			watchlater.save(username);
			res.status(201).json({ success: true, message: 'Movie has been added to watchlist!' });
		} else {
			await Watchlist.updateOne({ uid: username }, { $push: { Watchlist: { movieid, image_url, added, title } } });
			res.status(201).json({ success: true, message: 'Movie has been added to watchlist!' });
		}
	} catch (error) {
		return res.status(401).json({ success: false, message: 'Could not add movie to watchlist, try again.' });
	}
}

export const deleteFromWatchlist = async (req, res, next) => {
	const { user, movieid } = req.body;
	try {
		const userWatchlist = await Watchlist.updateOne({ uid: user }, { $pull: { Watchlist: { movieid: movieid } } });

		res.status(200).json(userWatchlist);
	} catch (error) {
		return res.status(404).json({ success: false, message: 'Could not delete from watchlist' });
	}
}

export const getWatchlist = async (req, res, next) => {
	const { user } = req.body;
	try {
		const watchlist = await Watchlist.findOne({ uid: user });
		res.status(200).json(watchlist);
	} catch (error) {
		return res.status(404).json({ success: false, message: 'could not get locate watchlist' });
	}
}

export const getFeaturedMovie = async (req, res, next) => {
	try {
		const featuredMovie = await Movies.aggregate([{ $sample: { size: 1 } }])
		res.status(200).json(featuredMovie);
	} catch (error) {
		return res.status(404).json({ success: false, message: 'Could not get Featured Movie' });
	}
}

export const getMoviesVIAGenre = async (req, res, next) => {
	const { genre } = req.body;
	let rand = Math.floor(Math.random() * 1000)
	const filter = {
		title: 1,
		imdb_id: 1,
		year: 1,
		rating: 1,
		popularity: 1,
		image_url: 1,
		movie_length: 1,
		banner: 1,
	};

	if (!genre) {
		return res.status(400).json({ success: false, message: 'Invalid Genre' });
	}

	const query = { 'gen.id': { '$eq': Number(genre) } };

	try {
		const sgenre1 = await Movies.find(query, filter).skip(rand).limit(40).sort({ popularity: 1 });
		res.status(200).json(sgenre1)
	} catch (error) {
		return res.status(404).json({ success: false, message: 'Could not get genre filtered movies.' })
	}
}
