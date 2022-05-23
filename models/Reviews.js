import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
	movieid: String,
	title: String,
	username: String,
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