import { CircularProgress, Grid, ImageListItem, ImageListItemBar } from '@mui/material';
import React, { Suspense } from 'react';

import './CastList.css';
import PosterNotFound from '../../MoviePosters/MoviePoster/PosterNotFound/images.png'

const CastList = ({ cast, title, size }) => {
	return (
		<Grid
			item
			display='flex'
			flexGrow={1}
			flexWrap='wrap'
			xs={12}
			md={11}
			justifyContent='center'
			width='100%'
			sx={{ pt: 1, pb: 1 }}
		>
			{Array.isArray(cast) && cast?.map((actor) => {
				return (
					<Suspense fallback={<CircularProgress color='inherit' />}>
						<ImageListItem sx={{ boxShadow: '0rem 0.5rem 1.5rem #000000', marginX: 0.5, marginBottom: 0.5 }} key={actor?.name?.id}>
							<img src={actor?.name?.primaryImage?.url || PosterNotFound} style={{ borderRadius: '5px', width: size, height: '100%' }} alt={''} loading='lazy' key={actor?.name?.id} />
							<ImageListItemBar subtitle={actor?.name?.nameText?.text} position='bottom' sx={{ margin: 0, padding: 0 }} />
						</ImageListItem>
					</Suspense>
				)
			})}
		</Grid>
	)
}

export default CastList