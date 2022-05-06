import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';

import Layout from '../../../layout/Layout.js';
import Movies from '../MoviePosters/MoviePosters'
import SearchBar from './SearchBar/SearchBar'

const SearchPage = () => {
	const movies = useSelector(state => state.movies)

	return (
		<Layout>
			<SearchBar />
			<Grid
				container
				justifyContent='space-around'>
				<Grid item xs={11}>
					{(Array.isArray(movies) && movies.length) ?
						<Grid
							container
						>
							<Movies movies={movies} />
						</Grid>
						:
						<Grid
							container
							alignItems='center'
							justifyContent='center'>
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