import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';

import Layout from '../../../layout/Layout.js';
import SearchBar from './SearchBar/SearchBar'
import Movies from '../MoviePosters/MoviePosters'

const SearchPage = () => {
	const movies = useSelector(state => state.movies)

	return (
		<Layout>
			<SearchBar />
			<Grid
				container
				alignItems="center"
				justifyContent="center">
				<Grid item xs={11}>
					{(Array.isArray(movies) && movies.length) ?
						<Grid
							container
						>
							<Movies movies={movies} compTitle={''} />
						</Grid>
						:
						<Grid
							container
							alignItems="center"
							justifyContent="center">
							<Typography
								variant='h4'
								align='center'
							>
								You can search by Title, Year, Genre or Rating
							</Typography>
						</Grid>}
				</Grid>
			</Grid>
		</Layout>
	)
}

export default SearchPage