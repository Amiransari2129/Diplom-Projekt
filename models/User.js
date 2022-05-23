import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	fullname: {
		type: String,
	},
	language: {
		type: String,
	},
	description: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		]
	},
	password: {
		type: String,
		required: true,
		select: false,
		minlength: 6,
	},
	resetToken: String,
	resetTokenExpire: String,
});

userSchema.pre('save', async function (next) {
	// check if password has been modified
	if (!this.isModified('password')) {
		next();
	} else {
		// hash if modified
		const salt = await bcrypt.genSalt(5);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	}
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.createSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.RANDOM_GEN_KEY, { expiresIn: 60 * 60 });
}

userSchema.methods.createResetToken = function () {
	const token = crypto.randomBytes(10).toString('hex');
	this.resetToken = crypto.createHash('sha256').update(token).digest('hex');
	const currentDate = new Date();
	this.resetTokenExpire = new Date(currentDate.getTime() + (10 * 60 * 1000));
	return token;
}

const User = mongoose.model('User', userSchema);

export default User;