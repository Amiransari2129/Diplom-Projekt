import { updateEmail } from "firebase/auth";

import { auth } from "../firebase-config";

export const updateUserProfile = (user) => async (dispatch) => {
	let action = [];
	console.log('user email:' + user.email)

	try {
		await updateEmail(auth.currentUser, user.email)

	} catch (error) {
		action = { type: 'error', error: error.response.data.message };
		dispatch(action);
	};
}
