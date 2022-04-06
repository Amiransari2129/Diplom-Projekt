import { Grid, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../../layout/Layout.js'

import MoviePoster from '../MoviePosters/MoviePosters'

const homePage = () => {
	return (
		<Layout>
			<Grid item xs={12}>
				<Typography variant='h1' >hello</Typography>
			</Grid>
		</Layout>
	)
}

export default homePage