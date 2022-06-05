import { Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'

import { getFeaturedMovie, getAction, getThriller, getWatchlist, getComedy } from '../../../actions/movies.js';
import FeaturedMovie from './FeaturedMovie/FeaturedMovie.js';
import Layout from '../../../layout/Layout.js'
import MovieRow from '../AllMovies/MovieRow/MovieRow.js';

const HomePage = () => {
	const dispatch = useDispatch();

	const featuredMovie = useSelector(state => state.fmovieReducer);
	const sgenrel1 = useSelector(state => state.sgenrel1);
	const sgenrel2 = useSelector(state => state.sgenrel2);
	const sgenrel3 = useSelector(state => state.sgenrel3);

	const [user] = useState({
		user: localStorage.getItem('uid')
	});

	const [genreChoice] = useState({
		action: 13,
		adventure: 4,
		animation: 10,
		biography: 27,
		comedy: 9,
		crime: 7,
		documentary: 33,
		drama: 8,
		family: 5,
		fantasy: 6,
		history: 31,
		horror: 28,
		music: 32,
		musical: 30,
		mystery: 15,
		romance: 26,
		sciFi: 11,
		sport: 12,
		thriller: 14,
		war: 29,
		western: 25,
	});


	useEffect(() => {
		dispatch(getFeaturedMovie());
		dispatch(getWatchlist(user));
		dispatch(getComedy(genreChoice.comedy));
		dispatch(getAction(genreChoice.action));
		dispatch(getThriller(genreChoice.thriller));
	}, [dispatch, genreChoice.action, genreChoice.comedy, genreChoice.thriller, user]);


	return (
		<Layout>
			<Grid item xs={12}>
				<FeaturedMovie movie={featuredMovie[0]} />
			</Grid>
			{
				(Array.isArray(sgenrel1) && sgenrel1.length) &&
				<>
					<Grid item xs={11} alignItems='center'>
						<Typography align='center' variant='h4' overflow='hidden'>Action</Typography>
						<MovieRow movieList={sgenrel2} />
					</Grid><Grid item xs={11}>
						<Typography align='center' variant='h4' overflow='hidden'>Thriller</Typography>
						<MovieRow movieList={sgenrel3} />
					</Grid><Grid item xs={11} marginBottom={5}>
						<Typography align='center' variant='h4' overflow='hidden'>Comedy</Typography>
						<MovieRow movieList={sgenrel1} />
					</Grid>
				</>
			}
		</Layout>
	)
}

export default HomePage