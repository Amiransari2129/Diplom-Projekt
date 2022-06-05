import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
	movieid: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	reviews: {
		type: Array, "default": [{
			rating: Number,
			reviewText: String,
		}]
	},
	date: Date,
});

reviewSchema.index({ movieid: 'text' });

const Reviews = mongoose.model('Reviews', reviewSchema);

export default Reviews;




