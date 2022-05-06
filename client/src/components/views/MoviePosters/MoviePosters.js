import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

import Movie from './MoviePoster/MoviePoster'

import './MoviePosters.css'

const MoviePosters = ({ movies }) => {
	const navigate = useNavigate();
	const handlePosterClick = (id) => {
		navigate(`/movies/${id}`);
	}

	return (
		<Grid
			container
			spacing={1}
		>
			{movies.map((movie) => (
				<Grid item xs={4} md={2} lg={1.3333} className='movie-poster' key={movie.movieid}>
					<Movie movie={movie} handlePosterClick={handlePosterClick} />
				</Grid>
			))
			}
		</Grid >
	)
}

export default MoviePosters