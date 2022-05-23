import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { WatchLater } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

import { addToWatchlist, deleteFromWatchlist, getWatchlist } from '../../../../actions/movies';

import PosterNotFound from './PosterNotFound/images.png';

const MoviePoster = ({ handlePosterClick, movie }) => {
	const dispatch = useDispatch();
	const watchlist = useSelector(state => state.watchlist);
	const [showWatchLater, setShowWatchLater] = useState(false);
	const [moviePoster, setMoviePoster] = useState(movie.image_url);

	const [user, setUser] = useState({
		user: localStorage.getItem('username')
	});

	const handleWatchLater = (e) => {
		e.preventDefault();

		dispatch(addToWatchlist(user.user, movie.imdb_id, movie.image_url, new Date(), movie.title));
		setTimeout(() => {
			dispatch(getWatchlist(user));
		}, 50);
	};

	const handleDeleteWatchLater = (e) => {
		e.preventDefault();

		dispatch(deleteFromWatchlist(user.user, movie.movieid || movie.imdb_id));
		setTimeout(() => {
			dispatch(getWatchlist(user));
		}, 50);
	};

	const checkContains = (wl, imdb_id) => {

		const watchlistArr = Object.values(wl?.Watchlist);
		if (watchlistArr.some(movie => movie.movieid === imdb_id)) {
			return true;
		} else {
			return false
		}
	}

	useEffect(() => {
		setTimeout(() => {
			const result = checkContains(watchlist, movie.imdb_id || movie.movieid)
			setShowWatchLater(result)
		}, 100);
	}, [movie.imdb_id, movie.movieid, watchlist]);
	return (
		<Card raised elevation={8} >
			<CardActionArea >
				<CardMedia
					onClick={() => handlePosterClick(movie.imdb_id || movie.movieid)}
					component='img'
					height='50%'
					loading='eager'
					src={moviePoster}
					onError={() => setMoviePoster(PosterNotFound)}
					alt={movie.title}
					style={{ objectFit: 'cover' }}
				/>
				<CardContent>
					<Typography variant='body1' noWrap mt={-1} mb={-1} mr={1.5}>
						{movie.title}
					</Typography>
				</CardContent>
				<CardActions >
					{
						movie.imdb_id &&
						<Box display='flex' flexGrow={1} >
							<Typography mt={-1.5} ml={1} variant='body2' color='text.secondary'>
								{movie.year}
							</Typography>
							<Typography variant="title" noWrap>
								&nbsp;
							</Typography>
							<Typography component='span' mt={-1.5} variant='body2' color='text.secondary'>
								•
							</Typography>
							<Typography variant="title" noWrap>
								&nbsp;
							</Typography>
							<Typography mt={-1.5} variant='body2' color='text.secondary'>
								{movie.movie_length}m
							</Typography>
						</Box>
					}
					<Box item display='flex' flexGrow={1}>
						{showWatchLater &&
							<WatchLater fontSize='medium' style={{ position: 'absolute', right: '5px', bottom: '0.8rem' }} onClick={(e) => handleDeleteWatchLater(e)} />
						}
						{!showWatchLater &&
							<WatchLaterOutlinedIcon fontSize='medium' style={{ position: 'absolute', right: '5px', bottom: '0.8rem' }} onClick={(e) => { handleWatchLater(e) }} />
						}
					</Box>
				</CardActions>
			</CardActionArea>
		</Card >
	)
}

export default MoviePoster
