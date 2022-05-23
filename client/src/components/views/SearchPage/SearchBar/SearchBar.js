import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { getFilteredMovies } from '../../../../actions/movies';
import { Alert, Button, Grid, MenuItem, Select, TextField, Box } from '@mui/material';

import './SearchBar.css'

const SearchBar = ({ skipValue }) => {
	const dispatch = useDispatch();
	const movies = useSelector(state => state.movies)

	const [errorMSG, setErrorMSG] = useState('');


	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
		}, 5000);
	}
	useEffect(() => {
		!movies.success && setErrorMSG(movies.message)
		clearMSG();
	}, [movies])

	const genreHash = {
		'action': 13,
		'adventure': 4,
		'animation': 10,
		'biography': 27,
		'comedy': 9,
		'crime': 7,
		'documentary': 33,
		'drama': 8,
		'family': 5,
		'fantasy': 6,
		'history': 31,
		'horror': 28,
		'music': 32,
		'musical': 30,
		'mystery': 15,
		'romance': 26,
		'sciFi': 11,
		'sport': 12,
		'thriller': 14,
		'war': 29,
		'western': 25,
	}

	const placeHoldertext = {
		'title': 'Enter name of the movie',
		'genre': 'Enter name of the genre',
		'year': 'Enter a release year',
		'rating': 'Enter a rating, Results will show up in Ascending order',
	}

	const [searchCriteria, setSearchCriteria] = useState({
		filterKey: 'æqæqæ',
		catKey: 'title',
	});

	const handleFilter = async (e) => {
		e.preventDefault();
		if (searchCriteria.catKey === 'genre') {
			dispatch(getFilteredMovies(searchCriteria.catKey, genreHash[searchCriteria.filterKey.toLowerCase()], skipValue));
		} else {
			return dispatch(getFilteredMovies(searchCriteria.catKey, searchCriteria.filterKey, skipValue));
		}
	};

	useEffect((e) => {
		if (searchCriteria.catKey === 'genre') {
			dispatch(getFilteredMovies(searchCriteria.catKey, genreHash[searchCriteria.filterKey.toLowerCase()], skipValue));
		} else {
			dispatch(getFilteredMovies(searchCriteria.catKey, searchCriteria.filterKey, skipValue));
		}
	}, [skipValue])


	return (
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
						label={placeHoldertext[searchCriteria.catKey]}
						autoFocus
						onChange={(e) => setSearchCriteria({
							...searchCriteria,
							filterKey: e.target.value
						})}
					/>
					<Box sx={{ mb: -1 }}>
						<Select
							select='true'
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
						<Alert variant='outlined' severity='error' sx={{ background: '#030303' }}>
							{errorMSG}
						</Alert>}
				</Box>
			</Box>
		</Grid >
	)
}

export default SearchBar