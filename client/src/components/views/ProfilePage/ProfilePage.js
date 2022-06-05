import { Button, Card, CardContent, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { auth } from '../../../firebase-config';
import { getUserReviews } from '../../../actions/reviews.js';
import { getWatchlist } from '../../../actions/movies.js';
import { updateUserProfile } from '../../../actions/profile.js';
import Layout from '../../../layout/Layout.js';
import MoviePosters from '../MoviePosters/MoviePosters.js';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState(0);

	const [user] = useState({
		user: localStorage.getItem('uid')
	});

	const profile = useSelector(state => state.profile);
	const reviews = useSelector(state => state.reviews);
	const watchlist = useSelector(state => state.watchlist);
	const watchlistArr = watchlist?.Watchlist;

	const [profileDetails, setProfileDetails] = useState({
		uid: localStorage.getItem('uid'),
		email: ''
	});

	const handleChange = (e, value) => {
		setValue(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserProfile(profileDetails));

	}

	useEffect(() => {
		dispatch(getWatchlist(user));
		dispatch(getUserReviews(auth?.currentUser?.displayName));
	}, [dispatch, user, value])

	return (
		<Layout>
			<Grid container justifyContent='center'>
				<Grid item xs={12} justifyContent='center' alignItems='center'>
					<Tabs value={value} onChange={handleChange} centered scrollButtons='auto'>
						<Tab id='Profile' label='Profile' />
						<Tab id='Reviews' label='Reviews' />
						<Tab id='Watchlist' label='Watchlist' />
					</Tabs>
				</Grid>
				<Grid item xs={4} >
					{value === 0 &&
						<Card elevation={11}>
							<CardContent component='form' onSubmit={(e) => handleSubmit(e)}>
								<Grid
									container
									alignItems='center'
									justifyContent='center'
								>
									<Grid item xs={12}>
										<Typography variant='h6' align='left' gutterBottom>{auth?.currentUser?.email}</Typography>
										<Typography variant='h6' align='left' gutterBottom>{auth?.currentUser?.displayName}</Typography>
									</Grid>
									<Grid item xs={12}>
										<TextField
											label='Email'
											variant='standard'
											align='left'
											defaultValue={profile?.data?.email}
											sx={{ marginBottom: 1 }}
											value={profileDetails.email}
											onChange={(e) => setProfileDetails({
												...profileDetails,
												email: e.target.value
											})}
										/>

									</Grid>
									<Grid item xs={2}>
										<span></span>
									</Grid>
								</Grid>
								<Button variant='outlined' type='submit' >Edit Info</Button>
							</CardContent>
						</Card>
					}
				</Grid>
				<Grid item xs='10'>
					{value === 1 &&
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

					{value === 2 &&
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
			</Grid>
		</Layout >
	)
}

export default ProfilePage
