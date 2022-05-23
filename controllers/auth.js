import crypto from 'crypto';
import sendEmail from '../utils/sendResetPassword.js';
import User from '../models/User.js';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({
			username, email, password, fullname: '', language: '', description: '',
		});

		const token = user.createSignedToken();
		res.status(201).json({ success: true, token, username, message: 'User has been created!' });
	} catch (error) {
		if (error.keyPattern?.username) {
			return res.status(401).json({ success: false, message: 'Name already in use' });
		}
		if (error.keyPattern?.email) {
			return res.status(401).json({ success: false, message: 'Email already in use' });
		}
		if (error.errors.password?.properties.type) {
			return res.status(401).json({ success: false, message: 'password must be longer than 6 characters' });
		}
		return res.status(400).json({ success: false, message: 'Please Provide valid Name, Username or Password' });
	}
}

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ success: false, message: 'Please provide an Email and Password' });
	};

	try {
		const user = await User.findOne({ email }).select('+password');
		const username = user.username;
		if (!user) {
			return res.status(401).json({ success: false, message: 'Invalid Email' });
		};

		const passMatch = await user.comparePassword(password);

		if (!passMatch) {
			return res.status(401).json({ success: false, message: 'Invalid Password' });
		};

		const token = user.createSignedToken();
		res.status(200).json({ success: true, token, username });

	} catch (error) {

		return res.status(401).json({ success: false, message: 'Invalid email or password' });
	}
}

export const forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ success: false, message: 'Invalid Email' });
		}

		const token = user.createResetToken();

		await user.save();

		const urlResetPassword = `${process.env.APP_URL}/resetpassword/${token}`;
		const body = `
			<h1>Hello!</h1>
			<p> Someone has requested a link to change your password!</p>
			<p>This can be done though the link below.</p>
			<a href=${urlResetPassword} clicktracking=off>Change my password</a>
			<p>This link will be active for the next 10 minutes</p>
			<p>If you didn't request this, please ignore this email.</p>
			<p>Your password won't change until you access the link above and create a new one.</p>
		`

		try {
			sendEmail({
				to: user.email,
				subject: 'Password Reset Request',
				body
			})

			res.status(201).json({ success: true, message: 'Email has Been sent' });
		} catch (error) {
			user.resetToken = undefined;
			user.resetTokenExpire = undefined;

			await user.save();


			return res.status(500).json({ success: false, message: 'Error sending email, please try again!' });
		}

	} catch (error) {
		return res.status(404).json({ success: false, message: 'Invalid email' });
	}
}

export const resetPassword = async (req, res, next) => {
	const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
	const { password } = req.body;

	try {
		const user = await User.findOne({
			resetToken: resetToken,
			resetTokenExpire: { $gt: new Date() }
		})

		if (!user) {
			return res.status(400).json({ success: false, message: 'Reset Password Token has already been used or expired' });
		}

		user.password = password;
		user.resetToken = undefined;
		user.resetTokenExpire = undefined;

		await user.save();

		res.status(201).json({ success: true, message: 'Password has Been Changed' });
	} catch (error) {
		return res.status(400).json({ success: false, message: 'Something went wrong, please try again' });
	}
}

export const getProfile = async (req, res, next) => {
	const { user } = req.body;

	try {
		const userDetails = await User.findOne({ username: user })

		if (!userDetails) {
			return res.status(404).json({ success: false, message: 'User could not be found' });
		}

		res.status(201).json(userDetails);
	} catch (error) {
		return res.status(400).json({ success: false, message: 'Something went wrong, please try again' });
	}
}

export const updateProfile = async (req, res, next) => {
	const { username, email, fullname, language, description } = req.body;

	try {
		const userDetails = await User.findOne({ username })

		if (!userDetails) {
			return res.status(404).json({ success: false, message: 'User could not be found' });
		}

		userDetails.username = username;
		userDetails.email = email;
		userDetails.fullname = fullname;
		userDetails.language = language;
		userDetails.description = description;

		await userDetails.save();

		res.status(201).json({ success: true, token, username, message: 'User has been updated!' });
	} catch (error) {
		return res.status(400).json({ success: false, message: 'Please Provide valid information' });
	}
}