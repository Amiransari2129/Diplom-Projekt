import { Grid, ImageListItem, ImageListItemBar } from '@mui/material';
import React from 'react';

import './CastList.css';
import PosterNotFound from '../../MoviePosters/MoviePoster/PosterNotFound/images.png'

const CastList = ({ cast, title, size }) => {
	return (
		<>
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
				{Array.isArray(cast) && cast?.map((actor) => (
					<ImageListItem sx={{ boxShadow: '0rem 0.5rem 1.5rem #000000', marginX: 0.5, marginY: 0.5 }}>
						<img
							src={actor?.name?.primaryImage?.url}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src = PosterNotFound;
							}}
							style={{ borderRadius: '5px', width: size, height: '100%' }}
							alt={actor?.name?.nameText?.text} />
						<ImageListItemBar subtitle={actor?.name?.nameText?.text} position='bottom' />
					</ImageListItem>
				))}
			</Grid>
		</>
	)
}

export default CastList