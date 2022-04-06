import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const protect = async (req, res) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('token')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		res.status(401).json({ success: false, message: 'No Token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.RANDOM_GEN_KEY);

		const user = await User.findById(decoded.id);

		if (!user) {
			res.status(404).json({ success: false, message: 'Invalid User ID' });
		}

		req.user = user;

		res.status(200).json({ success: true, message: 'Token Authorized' });
	} catch (error) {
		res.status(401).json({ success: false, message: 'Unauthorized Token' });
	}
}