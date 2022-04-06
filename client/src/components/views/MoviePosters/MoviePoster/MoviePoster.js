import { Card, CardContent } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const MoviePoster = ({ handlePosterClick, movie }) => {
	return (
		<Card raised>
			<CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }} >
				<Box
					className='movie-poster'
					component='img'
					disableGutters
					src={movie.image_url}
					alt={movie.title}
					onClick={() => handlePosterClick(movie.imdb_id)}
					sx={{
						height: '100%',
						width: '100%',
					}}
				/>
			</CardContent>
		</Card>

	)
}

export default MoviePoster
