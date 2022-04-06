import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { getFilteredMovies } from '../../../../actions/movies';
import { Alert, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';

import './SearchBar.css'

const SearchBar = () => {
	const dispatch = useDispatch();
	const movies = useSelector(state => state.movies)

	const [errorMSG, setErrorMSG] = useState('');

	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
		}, 5000);
	}
	useEffect(() => {
		!movies.success && setErrorMSG(movies.error)
		clearMSG();
	}, [movies])

	const genreHash = {
		'action': 1,
		'adult': 2,
		'adventure': 3,
		'animation': 4,
		'biography': 5,
		'comedy': 6,
		'crime': 7,
		'documentary': 8,
		'drama': 9,
		'family': 10,
		'fantasy': 11,
		'film-Noir': 12,
		'game-Show': 13,
		'history': 14,
		'horror': 15,
		'music': 16,
		'musical': 17,
		'mystery': 18,
		'news': 19,
		'reality-TV': 20,
		'romance': 21,
		'sci-Fi': 22,
		'short': 23,
		'sport': 24,
		'talk-show': 25,
		'thriller': 26,
		'war': 27,
		'western': 28,
	}

	const placeHoldertext = {
		'title': 'Enter name of the movie',
		'genre': 'Enter name of the genre',
		'year': 'Enter a release year',
		'rating': 'Enter a rating, Results will show up in Ascending order',
	}

	const [searchCriteria, setSearchCriteria] = useState({
		filterKey: '',
		catKey: 'title',
	});

	const handleFilter = async (e) => {
		e.preventDefault();
		if (searchCriteria.catKey === 'genre') {
			dispatch(getFilteredMovies(searchCriteria.catKey, genreHash[searchCriteria.filterKey.toLowerCase()]));
		} else {
			return dispatch(getFilteredMovies(searchCriteria.catKey, searchCriteria.filterKey));
		}
	};

	return (
		<Grid
			container
			alignItems='center'
			justifyContent='center'>
			<Grid item xs={11} >
				<Box
					component='form'
					onSubmit={(e) => handleFilter(e)}
					noValidate>
					<div className='hori-form'>
						<TextField
							type='text'
							margin='normal'
							required
							fullWidth
							label='Search Keyword'
							autoFocus
							onChange={(e) => setSearchCriteria({
								...searchCriteria,
								filterKey: e.target.value
							})}
						/>
						<Box sx={{ mb: -1 }}>
							<Select
								select
								value={searchCriteria.catKey}
								defaultValue='title'
								onChange={(e) => setSearchCriteria({
									...searchCriteria,
									catKey: e.target.value
								})}
							>
								<MenuItem value='title'>Title</MenuItem>
								<MenuItem value='genre'>Genre</MenuItem>
								<MenuItem value='year'>Year</MenuItem>
								<MenuItem value='rating'>Rating</MenuItem>
							</Select>
						</Box>
						<Button type='submit' sx={{ display: 'none' }} />
					</div>
					<Box textAlign='center' sx={{ mb: '7px' }}>
						{errorMSG &&
							<Alert variant='outlined' severity='error'>
								{errorMSG}
							</Alert>}
					</Box>
				</Box>
			</Grid >
		</Grid >
	)
}

export default SearchBar