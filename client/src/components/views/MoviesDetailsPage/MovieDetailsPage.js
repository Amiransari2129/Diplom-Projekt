import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react'

import { getCastDetails, getCDWDetails, getEarningsDetails, getExtendedCastDetails, getMovieDetails, getMovieAwards } from '../../../actions/movies';
import { getMovieReviews } from '../../../actions/reviews';
import CastList from './CastList/CastList'
import Layout from '../../../layout/Layout.js';
import MovieDetailBanner from './MovieDetailBanner/MovieDetailBanner'
import ReviewMovie from './ReviewMovie/ReviewMovie'

const MovieDetailsPage = () => {
	let { id } = useParams();
	const dispatch = useDispatch();

	const movieDetails = useSelector(state => state.movies);
	const cast = useSelector(state => state.cast);
	const extendedCast = useSelector(state => state.extendedCast);
	const CDW = useSelector(state => state.CDW);
	const awards = useSelector(state => state.awards);

	useEffect(() => {
		dispatch(getCastDetails(id));
		dispatch(getMovieDetails(id));
		dispatch(getEarningsDetails(id));
		dispatch(getExtendedCastDetails(id));
		dispatch(getCDWDetails(id));
		dispatch(getMovieAwards(id));
		dispatch(getMovieReviews(id));
	}, [dispatch, id])

	return (
		<Layout>
			<Grid container justifyContent='center' >
				<Grid item xs={12}>
					<MovieDetailBanner movie={movieDetails} extendedCast={extendedCast} CDW={CDW} awards={awards} />
				</Grid>
				<Grid item xs={12} align='center' paddingY='2rem'>
					<CastList cast={cast} title={movieDetails.title} size={'7.6rem'} />
				</Grid>

				<Grid item xs={9} >
					<ReviewMovie title={movieDetails.title} />
				</Grid>

			</Grid>
		</Layout >
	)
}

export default MovieDetailsPage