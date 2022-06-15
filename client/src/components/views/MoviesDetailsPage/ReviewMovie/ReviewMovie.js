import { CardContent, Rating, TextField, Grid, Button, Typography, Alert } from '@mui/material';
import { StarRateOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

import { auth } from '../../../../firebase-config';
import { getMovieReviews } from '../../../../actions/reviews';
import Reviews from './DisplayReviews/DisplayReviews';

const ReviewMovie = ({ title, profile }) => {
	let { id } = useParams();
	const dispatch = useDispatch();

	const reviewsData = useSelector(state => state.reviews);

	const [review, setReview] = useState({
		title,
		username: auth?.currentUser?.displayName,
		rating: 0,
		reviewText: ''
	});

	const [errorMSG, setErrorMSG] = useState('');

	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
		}, 5000);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const options = {
			header: {
				'Content-Type': 'application/json'
			}
		};
		try {
			if (review.rating === null) {
				review.rating = 0;
			}

			await axios.post(`../review/${id}/review`, review, options).then(
				setTimeout(() => {
					dispatch(getMovieReviews(id))
				}, 50)
			);

			setReview({
				title,
				username: profile?.data?.displayName,
				rating: 0,
				reviewText: ''
			})
		} catch (error) {
			setErrorMSG(error.message)
			return clearMSG();
		};
	};

	return (
		<Grid item xs={12} md={12}>
			<CardContent component='form' onSubmit={(e) => handleSubmit(e)} noValidate>
				<Rating
					name='size-small'
					precision={0.5}
					defaultValue={0}
					value={review.rating}
					onChange={(e, nV) => {
						setReview({
							...review,
							username: auth?.currentUser?.displayName,
							title,
							rating: nV
						});
					}}
					icon={<StarRateOutlined style={{ pointerEvents: "auto" }} />}
				/>
				<TextField
					variant='standard'
					multiline
					aria-label='minimum height'
					minRows={6}
					maxRows={10}
					value={review.reviewText}
					wrap='true'
					placeholder='Write your review here!'
					style={{ width: '100%', background: '#101010', color: '#ffbc12', padding: '0.5rem', marginBottom: 5 }}
					onChange={(e) => setReview({
						...review,
						username: auth?.currentUser?.displayName,
						title,
						reviewText: e.target.value
					})}
				/>
				<Button type='submit' variant='outlined' sx={{ mb: 1 }}>Submit Review</Button>
				{errorMSG &&
					<Alert variant="outlined" severity="error" sx={{ background: '#030303' }}>
						{errorMSG}
					</Alert>
				}
				<Grid item xs={12} >
					{(Array.isArray(reviewsData?.data) && reviewsData?.data?.length) ?
						<Grid
							container
							spacing={2}
							marginY={1}
						>
							{reviewsData?.data?.map((reviews) => {
								return (
									<Reviews reviews={reviews?.reviews} username={reviews?.username} />
								)
							})}
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
								There are no review for this movie.
							</Typography>
						</Grid>}

				</Grid>
			</CardContent >
		</Grid >
	)
}

export default ReviewMovie