import { Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { Suspense, useEffect, useState } from 'react'

import { getCastDetails } from '../../../../actions/movies'
import CastList from '../../MoviesDetailsPage/CastList/CastList'

import './FeaturedMovie.css'
import PosterNotFound from '../../MoviePosters/MoviePoster/PosterNotFound/images.png'

const FeaturedMovie = ({ movie }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [maxLine, setMaxLine] = useState(5)

	const handlePosterClick = (id) => {
		navigate(`/movies/${id}`);
	}

	const cast = useSelector(state => state.cast);

	useEffect(() => {
		dispatch(getCastDetails(movie?.imdb_id));
	}, [dispatch, movie?.imdb_id])

	const handleExpandClick = () => {
		if (maxLine === 5) {
			setMaxLine(-1)
		} else if (maxLine === -1) {
			setMaxLine(5)
		}
	}

	const string = movie?.description;
	const showExpand = string?.split('')?.length - 1;

	return (
		<Grid container spacing={4} justifyContent='center' marginTop={1}>
			<Grid item xs={9} md={5} lg={2}>
				<Suspense fallback={<CircularProgress color='inherit' />}>
					<Card
						className='featured-poster'
						raised
						elevation={8}
						sx={{ background: '#101010', borderRadius: '5px' }}
						onClick={() => handlePosterClick(movie?.imdb_id || movie?.movieid)} >
						<CardMedia
							component='img'
							src={movie?.banner || PosterNotFound}
							alt={movie?.title}
						/>
					</Card>
				</Suspense>
			</Grid>
			<Grid item xs={9} md={6} lg={4} align='center'>
				<Typography align='center' variant='h4' marginBottom={1} >Featured Movie</Typography>
				<Card raised elevation={8} >
					<CardContent>
						<Typography
							variant='h3'
							sx={{
								display: '-webkit-box',
								overflow: 'hidden',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 2,
							}}
							gutterBottom
						>
							{movie?.title}
						</Typography>
						<Typography variant='body2' gutterBottom
							sx={{
								display: '-webkit-box',
								overflow: 'hidden',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: maxLine,
							}}>
							{movie?.description}
						</Typography>

						{
							maxLine === 5 && showExpand >= 500 &&
							<ExpandMore onClick={() => handleExpandClick()} />
						}
						{
							maxLine === -1 && showExpand >= 500 &&
							<ExpandLess onClick={() => handleExpandClick()} />
						}

					</CardContent>
				</Card>
				<CastList cast={cast} title={movie?.title} size={'6rem'} />
			</Grid>
		</Grid>
	)
}

export default FeaturedMovie