import axios from 'axios';

export const getFilteredMovies = (catKey, filterKey) => async (dispatch) => {
	let action = [{}];

	const searchCriteria = {
		catKey,
		filterKey
	}

	const options = {
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