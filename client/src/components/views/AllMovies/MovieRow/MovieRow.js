import { Avatar, CircularProgress, Tab, Tabs } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import React, { Suspense } from 'react'

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
			xs={12}
			variant='scrollable'
			scrollButtons='auto'
			TabIndicatorProps={{
				style: {
					display: 'none',
				},
			}}
		>
			{movieList?.map((movie) => (
				<Tab
					id='movie-row-poster'
					key={movie.imdb_id}
					sx={{
						paddingX: '.25rem'
					}}
					icon={
						<Suspense fallback={<CircularProgress color='inherit' />}>
							<Avatar
								variant='square'
								alt={movie.title}
								src={movie.image_url}
								onError={({ currentTarget }) => {
									currentTarget.onerror = null;
									currentTarget.src = PosterNotFound;
								}}
								sx={{
									width: '9rem',
									height: '100%',
									objectFit: 'cover'
								}}
								onClick={() => handlePosterClick(movie.imdb_id)}
							/>
						</Suspense>
					}
				/>
			))}
		</Tabs >

	)
}

export default MovieRow
