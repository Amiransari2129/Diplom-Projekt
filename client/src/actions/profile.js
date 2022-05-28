import axios from 'axios';

export const getProfile = (user) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const profileDetails = await axios.put(`../auth/getprofile`, user, options);

		action = { type: 'getProfile', payload: profileDetails };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data };
		dispatch(action);
	};
}

export const updateProfile = (user) => async (dispatch) => {
	let action = [];

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${localStorage.getItem('token')}`
		}
	}

	try {
		const profileDetails = await axios.post(`../auth/updateprofile`, user, options);

		action = { type: 'getProfile', payload: profileDetails };
		dispatch(action);
	} catch (error) {
		action = { type: 'error', error: error.response.data.message };
		dispatch(action);
	};
}