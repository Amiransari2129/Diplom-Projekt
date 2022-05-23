import { Grid, ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'

import PosterNotFound from '../../../MoviePosters/MoviePoster/PosterNotFound/images.png'

const ExtendedCastList = ({ extendedCast }) => {
	return (
		<Grid
			item
			display='flex'
			flexWrap='wrap'
			xs={12}
			md={11}
			margin='0 auto'
		>
			{extendedCast && extendedCast?.map((actor) => (
				<ImageListItem sx={{ boxShadow: '0rem 0.5rem 1.5rem #000000', marginX: 0.5, marginBottom: 0.5 }} key={actor?.node?.name?.id}>
					<img src={actor?.node?.name?.primaryImage?.url || PosterNotFound} style={{ borderRadius: '5px', width: '7.3rem', height: '100%' }} alt={''} loading='lazy' />
					<ImageListItemBar subtitle={actor.node?.name?.nameText?.text} position='bottom' sx={{ margin: 0, padding: 0 }} />
				</ImageListItem>
			))}
		</Grid >
	)
}

export default ExtendedCastList