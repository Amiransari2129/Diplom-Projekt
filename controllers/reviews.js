import Reviews from '../models/Reviews.js';

export const createReviews = async (req, res, next) => {
	const { id } = req.params;
	const { rating, reviewText, username, title } = req.body;


	if (!rating || !reviewText || !username || !title) {
		return res.status(400).json({ success: false, message: 'Please provide valid rating or review' });
	}

	try {
		const isThere = await Reviews.findOne({ movieid: id, username });
		if (!isThere) {
			const review = await Reviews.create({
				movieid: id, title, username, reviews: { rating, reviewText, date: new Date() }
			});
			review.save(id);
			return res.status(201).json({ success: true, message: 'Review has been submitted!' });
		} else {
			await Reviews.updateOne({ movieid: id, title, username }, { $push: { reviews: { rating, reviewText, date: new Date() } } });
			return res.status(201).json({ success: true, message: 'Review has been submitted!' });
		}
	} catch (error) {
		return res.status(400).json({ success: false, message: 'Please provide valid rating or review' });
	}

}

export const getReviews = async (req, res, next) => {
	const { id } = req.params;

	try {
		const reviewDetails = await Reviews.find({ movieid: id });
		res.status(200).json(reviewDetails);
	} catch (error) {
		return res.status(404).json({ success: false, message: 'Could not get reviews' });
	}
}

export const getReviewsByUser = async (req, res, next) => {
	const { user } = req.params;
	try {
		const reviewDetails = await Reviews.find({ username: user });
		res.status(200).json(reviewDetails);
	} catch (error) {
		return res.status(404).json({ success: false, message: 'Could not get reviews' });
	}
}