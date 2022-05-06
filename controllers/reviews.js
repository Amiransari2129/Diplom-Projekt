import Reviews from '../models/Reviews.js';

export const createReviews = async (req, res, next) => {
	const { id } = req.params;
	const { rating, reviewText, username } = req.body;

	if (!rating || !reviewText || !username) {
		return res.status(400).json({ success: false, message: 'Please provide valid rating or review' });
	}

	try {
		const isThere = await Reviews.findOne({ movieid: id });

		if (!isThere) {
			const review = await Reviews.create({
				movieid: id, username, reviews: { rating, reviewText }
			});
			review.save(id);
			return res.status(201).json({ success: true, message: 'Review has been submitted!' });
		} else {
			await Reviews.updateOne({ movieid: id }, { $push: { reviews: { rating, reviewText } } });
			return res.status(201).json({ success: true, message: 'Review has been submitted!' });
		}
	} catch (error) {
		return res.status(400).json({ success: false, message: 'Please provide valid rating or review' });
	}

}

export const getReviews = async (req, res, next) => {
	const { id } = req.params;

	try {
		const reviewDetails = await Reviews.findOne({ movieid: id });
		res.status(200).json(reviewDetails);
	} catch (error) {
		return res.status(404).json({ success: false, message: 'Could not get reviews' });
	}
}