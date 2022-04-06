import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Movie from './MoviePoster/MoviePoster'

import './MoviePosters.css'

const MoviePosters = ({ title, movies }) => {
	const navigate = useNavigate();

	const handlePosterClick = (id) => {
		navigate(`/movies/${id}`);
	}
	return (
		<Grid
			container
			spacing={1}
		>
			<Typography>{title}</Typography>
			{movies.map((movie) => (
				<Grid item xs={4} md={2} lg={1} className='movie-poster'>
					<Movie movie={movie} key={movie.imdb_id} handlePosterClick={handlePosterClick} />
				</Grid>
			))}
		</Grid>
	)
}

export default MoviePosters