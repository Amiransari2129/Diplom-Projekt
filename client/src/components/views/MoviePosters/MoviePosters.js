import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

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
			{movies.map((movie) => (
				<Grid item xs={3} md={1.714} lg={1.2} className='movie-poster' key={movie.imdb_id || movie.movieid}>
					<Movie movie={movie} handlePosterClick={handlePosterClick} />
				</Grid>
			))
			}
		</Grid >
	)
}

export default MoviePosters