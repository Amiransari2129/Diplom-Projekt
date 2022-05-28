import { CircularProgress, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React, { Suspense } from 'react'

import Movie from './MoviePoster/MoviePoster'

import './MoviePosters.css'

const MoviePosters = ({ movies }) => {
	const navigate = useNavigate();
	const handlePosterClick = (id) => {
		navigate(`/movies/${id}`);
	};

	return (
		<Grid
			container
			spacing={1}
		>
			<Suspense fallback={<CircularProgress color='inherit' />}>
				{movies.map((movie) => (
					<Grid item xs={3} md={1.714} lg={1.2} className='movie-poster' key={movie.imdb_id || movie.movieid}>
						<Movie movie={movie} handlePosterClick={handlePosterClick} />
					</Grid>
				))
				}
			</Suspense>
		</Grid >
	)
}

export default MoviePosters