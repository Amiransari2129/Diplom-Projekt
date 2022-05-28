import { Alert, Button, Card, CardContent, Grid, Tab, Tabs, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { getProfile, updateProfile } from '../../../actions/profile.js';
import { getUserReviews } from '../../../actions/reviews.js';
import { getWatchlist } from '../../../actions/movies.js';
import Layout from '../../../layout/Layout.js';
import MoviePosters from '../MoviePosters/MoviePosters.js';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState(0);

	const [user] = useState({
		user: localStorage.getItem('username')
	});

	const [errorMSG, setErrorMSG] = useState('');

	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
		}, 5000);
	}


	const profile = useSelector(state => state.profile);
	const reviews = useSelector(state => state.reviews);
	const watchlist = useSelector(state => state.watchlist);
	const watchlistArr = watchlist?.Watchlist;

	useEffect(() => {
		if (profile.status !== 201) {
			setErrorMSG(profile)
		}

		clearMSG()
	}, [profile])


	const [profileDetails, setProfileDetails] = useState({
		username: '',
		fullname: '',
		email: '',
		language: ''
	});

	const handleChange = (e, value) => {
		setValue(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateProfile(profileDetails));
		setTimeout(() => {
			dispatch(getProfile(user));
		}, 500);
	}

	useEffect(() => {
		dispatch(getWatchlist(user));
		dispatch(getUserReviews(user.user));
		dispatch(getProfile(user));
	}, [user])

	useEffect(() => {
		profileDetails.fullname && setProfileDetails({
			...profileDetails,
			fullname: profile?.data?.fullname,
		})
		profileDetails.email && setProfileDetails({
			...profileDetails,
			email: profile?.data?.email,
		})
		profileDetails.language && setProfileDetails({
			...profileDetails,
			language: profile?.data?.language,
		})
		profileDetails.language && setProfileDetails({
			...profileDetails,
			language: profile?.data?.description,
		})

	}, [user])

	return (
		<Layout>
			<Grid item xs={12} justifyContent='center' alignItems='center'>
				<Tabs value={value} onChange={handleChange} centered scrollButtons='auto'>
					<Tab id='Profile' label='Profile' />
					<Tab id='Settings' label='Settings' />
					<Tab id='Reviews' label='Reviews' />
					<Tab id='Watchlist' label='Watchlist' />
				</Tabs>
			</Grid>
			<Grid item xs={8}>
				{value === 0 &&
					<Card elevation={11}>
						<CardContent>
							<Grid container>
								<Grid item xs={5}>
									<Typography variant='h6' align='left' gutterBottom>{profile?.data?.fullname}</Typography>
									<Typography variant='h6' align='left' gutterBottom>{profile?.data?.username}</Typography>
									<Typography variant='h6' align='left' gutterBottom>{profile?.data?.email}</Typography>
									<Typography variant='h6' align='left' gutterBottom>{profile?.data?.language}</Typography>
								</Grid>
								<Grid item xs={12} md={7}>
									<TextareaAutosize
										align='left'
										aria-label='minimum height'
										minRows={5}
										placeholder='Minimum 3 rows'
										defaultValue={profile?.data?.description}
										style={{ width: 250, background: '#131313', color: '#ffbc12' }}
										disabled
										spellCheck='false'
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				}
				{value === 1 &&
					<Card elevation={11} >
						<CardContent component='form' onSubmit={(e) => handleSubmit(e)}>
							<Grid container>
								<Grid item xs={3}>
									<Typography variant='h6' align='left' gutterBottom>{profile?.data?.username}</Typography>
									<TextField
										label='Full Name'
										variant='standard'
										align='left'
										defaultValue={profile?.data?.fullname}
										sx={{ marginBottom: 1 }}
										value={profileDetails.fullname}
										onChange={(e) => setProfileDetails({
											...profileDetails,
											username: profile?.data?.username,
											fullname: e.target.value
										})} />
									<TextField
										label='Email'
										variant='standard'
										align='left'
										defaultValue={profile?.data?.email}
										sx={{ marginBottom: 1 }}
										value={profileDetails.email}
										onChange={(e) => setProfileDetails({
											...profileDetails,
											username: profile?.data?.username,
											email: e.target.value
										})}
									/>
									<TextField
										label='Language'
										variant='standard'
										align='left'
										defaultValue={profile?.data?.language}
										sx={{ marginBottom: 1 }}
										value={profileDetails.language}
										onChange={(e) => setProfileDetails({
											...profileDetails,
											username: profile?.data?.username,
											language: e.target.value
										})}
									/>
								</Grid>
								<Grid item xs={2}>
									<span></span>
								</Grid>
								<Grid item xs={12} md={7}>
									<TextareaAutosize
										aria-label='minimum height'
										minRows={5}
										placeholder='Minimum 3 rows'
										style={{ width: 250, background: '#131313', color: '#ffbc12' }}
										spellCheck='false'
										defaultValue={profile?.data?.description}
										value={profileDetails.description}
										onChange={(e) => setProfileDetails({
											...profileDetails,
											username: profile?.data?.username,
											description: e.target.value
										})}
									/>
								</Grid>
							</Grid>
							<Button variant='outlined' type='submit' >Edit Info</Button>
						</CardContent>
					</Card>
				}

				{value === 2 &&
					<Card elevation={11}>

						<CardContent >
							<Grid container spacing={2} display='flex' flexDirection='row' justifyContent='center'>
								{reviews?.data && reviews?.data?.map((review) =>
									<Grid item xs={7} md={3}>
										<Card raised elevation={8} sx={{ marginY: 1 }} >
											<CardContent>
												<Typography variant='body2' sx={{
													display: '-webkit-box',
													overflow: 'hidden',
													WebkitBoxOrient: 'vertical',
													WebkitLineClamp: 1,
												}}>
													{review?.title}
												</Typography>
												<Typography variant='h5' >
													{review?.reviews[0]?.rating} <Star />
												</Typography>
												<Typography variant='body1' gutterBottom
													sx={{
														display: '-webkit-box',
														overflow: 'hidden',
														WebkitBoxOrient: 'vertical',
														WebkitLineClamp: 5,
													}}>
													{review?.reviews[0]?.reviewText}
												</Typography>
											</CardContent>
										</Card >
									</Grid>
								)}
								{(reviews?.data.length === 0) &&
									<Grid
										container
										alignItems='center'
										justifyContent='center'>
										<Typography
											variant='h4'
											align='center'
											marginTop={2}
										>
											You have no movie reviews to display
										</Typography>
									</Grid>
								}
							</Grid>
						</CardContent>
					</Card>
				}

				{value === 3 &&
					<Card elevation={11}>
						<CardContent>
							{(Array.isArray(watchlistArr) && watchlistArr?.length) ?
								<Grid
									container
								>
									<MoviePosters movies={watchlistArr} />
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
										You have no movies in your watchlist
									</Typography>
								</Grid>}
						</CardContent>
					</Card>
				}
			</Grid>

		</Layout >
	)
}

export default ProfilePage
