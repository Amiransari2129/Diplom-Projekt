import express from 'express';

import { getMovie, filterMovies, addWatchlater, getWatchlist, deleteFromWatchlist, getFeaturedMovie, getMoviesVIAGenre } from '../controllers/movies.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/featuredmovie', getFeaturedMovie);
router.get('/:id', getMovie);
router.put('/filter', filterMovies);
router.post('/addwatchlist', addWatchlater);
router.put('/getmlviagenre', getMoviesVIAGenre);
router.put('/getwatchlist', getWatchlist);
router.put('/deletefromwatchlist', deleteFromWatchlist);

export default router;