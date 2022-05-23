import axios from 'axios';

export const getFilteredMovies = (catKey, filterKey, skip) => async (dispatch) => {
	let action = [{}];

	const searchCriteria = {
		catKey,
		filterKey
	}

	const options = {
		params: {
			skip,
			limit: 40,
		},
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const filteredMovies = await axios.put('movies/filter', searchCriteria, options);

		action = { type: 'getFilteredMovies', payload: filteredMovies.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getMovieDetails = (id) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const movieDetails = await axios.get(`/movies/${id}`, id, options);
		action = { type: 'getMovieDetails', payload: movieDetails.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getCastDetails = (id) => async (dispatch) => {
	let action = [{}];

	const options = {
		method: 'GET',
		url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
		params: { info: 'principalCast' },
		headers: {
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
			'X-RapidAPI-Key': '6cad6fe930msh13285a49d62b3ddp1beadajsn5f64f608411e'
		}
	};

	try {
		const castDetails = await axios.request(options)
		action = { type: 'getCastDetails', payload: castDetails.data.results.principalCast[0].credits };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getExtendedCastDetails = (id) => async (dispatch) => {
	let action = [{}];

	const options = {
		method: 'GET',
		url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
		params: { info: 'extendedCast' },
		headers: {
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
			'X-RapidAPI-Key': '6cad6fe930msh13285a49d62b3ddp1beadajsn5f64f608411e'
		}
	};

	try {
		const extendedCastDetails = await axios.request(options)
		action = { type: 'getExtendedCastDetails', payload: extendedCastDetails.data.results.cast.edges };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getCDWDetails = (id) => async (dispatch) => {
	let action = [{}];

	const options = {
		method: 'GET',
		url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
		params: { info: 'creators_directors_writers' },
		headers: {
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
			'X-RapidAPI-Key': '6cad6fe930msh13285a49d62b3ddp1beadajsn5f64f608411e'
		}
	};

	try {
		const extendedCastDetails = await axios.request(options)
		action = { type: 'getCDWDetails', payload: extendedCastDetails.data.results };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getMovieAwards = (id) => async (dispatch) => {
	let action = [{}];

	const options = {
		method: 'GET',
		url: `https://data-imdb1.p.rapidapi.com/titles/${id}`,
		params: { info: 'awards' },
		headers: {
			'X-RapidAPI-Host': 'data-imdb1.p.rapidapi.com',
			'X-RapidAPI-Key': 'ab653dd07cmsh2bd51136f71d09cp1f4287jsn1c9014fb48dd'
		}
	};

	try {
		const extendedCastDetails = await axios.request(options)
		action = { type: 'getMovieAwards', payload: extendedCastDetails.data.results };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getEarningsDetails = (id) => async (dispatch) => {
	let action = [];

	const options = {
		method: 'GET',
		url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
		params: { info: 'revenue_budget' },
		headers: {
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
			'X-RapidAPI-Key': '6cad6fe930msh13285a49d62b3ddp1beadajsn5f64f608411e'
		}
	};

	try {
		const earningsDetails = await axios.request(options)
		action = { type: 'getEarningsDetails', payload: earningsDetails.data.results };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const addToWatchlist = (username, movieid, image_url, added, title) => async (dispatch) => {
	let action = [];

	const data = {
		username,
		movieid,
		title,
		image_url,
		added
	}

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const watchlater = await axios.post('movies/addwatchlist', data, options);

		action = { type: 'getWatchlist', payload: watchlater.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const deleteFromWatchlist = (user, movieid) => async (dispatch) => {
	let action = [];

	const deleteCriteria = {
		user,
		movieid
	}

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const deletedOne = await axios.put('movies/deletefromwatchlist', deleteCriteria, options);
		action = { type: '', payload: deletedOne.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};


}

export const getWatchlist = (username) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const watchlist = await axios.put('movies/getwatchlist', username, options);
		action = { type: 'getWatchlist', payload: watchlist.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getFeaturedMovie = () => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const movieDetails = await axios.get(`/movies/featuredmovie`, '', options);
		action = { type: 'getfeaturedMovies', payload: movieDetails.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getComedy = (genre) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const sgenrel = await axios.put(`/movies/getmlviagenre`, { genre: genre }, options);
		action = { type: 'sgenrel1', payload: sgenrel.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getAction = (genre) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const sgenrel = await axios.put(`/movies/getmlviagenre`, { genre: genre }, options);
		action = { type: 'sgenrel2', payload: sgenrel.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getThriller = (genre) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const sgenrel = await axios.put(`/movies/getmlviagenre`, { genre: genre }, options);
		action = { type: 'sgenrel3', payload: sgenrel.data };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}