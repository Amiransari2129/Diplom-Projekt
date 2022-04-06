import Movies from "../models/Movies.js";
import ErrorMessage from '../utils/errorMessage.js';

export const getMovie = async (req, res, next) => {
	const { id } = req.params;
	try {
		const moviesDetails = await Movies.findOne({ imdb_id: id });
		res.status(200).json(moviesDetails);
	} catch (error) {
		return next(new ErrorMessage('Could not get Movie.', 404));
	}
}

export const filterMovies = async (req, res, next) => {
	const { filterKey, catKey } = req.body;

	if (!filterKey || !catKey) {
		return next(new ErrorMessage('Please provide valid search information.', 400));
	}

	let query = '';
	switch (catKey) {
		case 'year':
			query = { 'year': { '$eq': filterKey } };
			break;
		case 'title':
			query = {
				$text: {
					$search: `\"${filterKey}\"`,
					$caseSensitive: false,
				}
			};
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
		'gen.id': 1,
		'gen.genre': 1,
		rating: 1,
		popularity: 1,
		image_url: 1,
	};

	try {
		let filteredMovies = undefined;
		if (catKey === 'rating') {
			filteredMovies = await Movies.find(query, filter).sort({ rating: -1 });
		} else {
			filteredMovies = await Movies.find(query, filter).sort({ popularity: 1 });
		}

		if (filteredMovies.length <= 0) {
			return next(new ErrorMessage('Could not find what you were searching for.', 404));
		}

		res.status(200).json(filteredMovies);
	} catch (error) {
		return next(new ErrorMessage('Something went wrong, try again', 500));
	}
}
