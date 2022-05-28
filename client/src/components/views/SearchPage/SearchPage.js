import { CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import React, { Suspense, useEffect, useState } from 'react';

import Layout from '../../../layout/Layout.js';
import Movies from '../MoviePosters/MoviePosters'
import SearchBar from './SearchBar/SearchBar'

const SearchPage = () => {
	const movies = useSelector(state => state.movies);
	useEffect(() => {
		setSkipValue(1)
	}, [movies.filterKey])
	const [skipValue, setSkipValue] = useState(1);

	const handleSkipChange = (e, value) => {
		setSkipValue(value)
	}

	return (
		<Layout>
			<SearchBar skipValue={skipValue} />

			<Grid item xs={11}>
				<Suspense fallback={<CircularProgress color='inherit' />}>
					{(Array.isArray(movies.results) && movies.results.length) ?
						<Grid
							container
						>
							<Grid item xs={12}>
								<Movies movies={movies.results} />
							</Grid>
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
					{
						(Array.isArray(movies.results) && movies.results.length > 0) &&
						<Stack alignItems="center" paddingY={1}>
							<Pagination page={skipValue} count={Math.ceil(movies.pageNumber)} onChange={handleSkipChange} />
						</Stack>
					}
				</Suspense>

			</Grid>
		</Layout>
	)
}

export default SearchPage