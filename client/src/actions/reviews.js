import axios from 'axios';

export const getMovieReviews = (id) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const reviews = await axios.get(`../review/${id}/getreviews`, options);

		action = { type: 'getMovieReviews', payload: reviews };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const getUserReviews = (user) => async (dispatch) => {
	let action = [];
	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const reviews = await axios.get(`../review/getreviews/${user}`, options);

		action = { type: 'getMovieReviews', payload: reviews };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}
