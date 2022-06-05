import express from 'express';

import { createReviews, getReviews, getReviewsByUser } from '../controllers/reviews.js';

const router = express.Router();

router.post('/:id/review', createReviews);
router.get('/:id/getreviews', getReviews);
router.get('/getreviews/:user', getReviewsByUser);

export default router;