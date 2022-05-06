import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { getWatchlist } from '../../../actions/movies.js';
import Layout from '../../../layout/Layout.js';
import Movies from '../MoviePosters/MoviePosters'

const Watchlist = () => {
	const watchlist = useSelector(state => state.watchlist);
	const watchlistArr = watchlist?.Watchlist;

	const dispatch = useDispatch();

	const getUser = localStorage.getItem('username');
	const [user, setUser] = useState({
		user: getUser
	});

	useEffect(() => {
		dispatch(getWatchlist(user));
	}, [dispatch, user]);

	return (
		<Layout>
			<Grid
				container
				justifyContent='space-around'>
				<Grid item xs={11} sx={{ mt: '2rem' }}>
					{(Array.isArray(watchlistArr) && watchlistArr?.length) ?
						<Grid
							container
						>
							<Movies movies={watchlistArr} />
						</Grid>
						:
						<Grid
							container
							alignItems='center'
							justifyContent='center'>
							<Typography
								variant='h4'
								align='center'
							>
								You have no movies in your watchlist
							</Typography>
						</Grid>}
				</Grid>
			</Grid>
		</Layout>
	)
}

export default Watchlist