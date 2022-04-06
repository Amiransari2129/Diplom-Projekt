import express from 'express';

import { getMovie, filterMovies } from '../controllers/movies.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getMovie);
router.put('/filter', filterMovies);

export default router;