import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
	banner: String,
	content_rating: String,
	created_at: String,
	description: String,
	gen: { type: Array, "defailt": [] },
	image_url: String,
	imdb_id: String,
	keywords: { type: Array, "defailt": [] },
	more_like_this: { type: Array, "defailt": [] },
	movie_length: Number,
	plot: String,
	popularity: Number,
	rating: Number,
	release: String,
	title: String,
	trailer: String,
	type: String,
	year: Number,
});

movieSchema.index({ title: 'text' });

const Movies = mongoose.model('movieDetails', movieSchema);

export default Movies;