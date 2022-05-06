import { Tabs } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import React from 'react'

import './MovieRow.css'
import PosterNotFound from '../../MoviePosters/MoviePoster/PosterNotFound/images.png'

const MovieRow = ({ movieList }) => {
	const navigate = useNavigate();

	const handlePosterClick = (id) => {
		navigate(`/movies/${id}`)
	}

	return (
		<Tabs
			value={1}
			xs={10}
			variant='scrollable'
			TabIndicatorProps={{
				style: {
					display: 'none',
				},
			}}
		>
			{movieList?.map((movie) => (
				<img
					className='movie-row-poster'
					style={{ width: '8rem', marginInline: 3, marginTop: 10, marginBottom: 10, borderRadius: '5px' }}
					src={movie.image_url}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null; // prevents looping
						currentTarget.src = PosterNotFound;
					}}
					alt={movie.title}
					loading='lazy'
					onClick={() => handlePosterClick(movie.imdb_id)}
				/>
			))}
		</Tabs >

	)
}

export default MovieRow
