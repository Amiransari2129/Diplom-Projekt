import User from '../models/User.js';
import sendEmail from '../utils/sendResetPassword.js';
import crypto from 'crypto';
import ErrorMessage from '../utils/errorMessage.js';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({
			username, email, password
		});

		const token = user.createSignedToken();
		res.status(201).json({ success: true, token, message: 'User has been created!' });
	} catch (error) {
		if (error.keyPattern?.username) {
			return next(new ErrorMessage('Name is already in use', 401));
		}
		if (error.keyPattern?.email) {
			return next(new ErrorMessage('Email is already in use', 401));
		}
		if (error.errors.password?.properties.type) {
			return next(new ErrorMessage('Password must be longer than 6 characters.', 401));
		}
		return next(new ErrorMessage('Please Provide valid Name, Username or Password', 401));
	}
}

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorMessage('Please Enter a Email and Password', 400))
	};

	try {
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return next(new ErrorMessage('Invalid Email', 401))
		};

		const passMatch = await user.comparePassword(password);

		if (!passMatch) {
			return next(new ErrorMessage('Invalid Password', 401))
		};

		const token = user.createSignedToken();
		res.status(200).json({ success: true, token });

	} catch (error) {
		return next(new ErrorMessage('Invalid Username or Password', 401))
	}
}

export const forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return next(new ErrorMessage('Invalid Email', 401))
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

			return next(new ErrorMessage('Error sending email try again.', 500))
		}

	} catch (error) {
		return next(new ErrorMessage('Invalid Email.', 404))
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
			return next(new ErrorMessage('Reset Password Token has already been used or expired', 400))
		}

		user.password = password;
		user.resetToken = undefined;
		user.resetTokenExpire = undefined;

		await user.save();

		res.status(201).json({ success: true, message: 'Password has Been Changed' });
	} catch (error) {
		return next(new ErrorMessage('Something went wrong. try again', 404))
	}
}
