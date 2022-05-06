import { CardContent, Rating, TextField, Grid, Button, Typography, Alert } from '@mui/material'
import { StarRateOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react'

import { getMovieReviews } from '../../../../actions/reviews';
import Reviews from './DisplayReviews/DisplayReviews'

const ReviewMovie = () => {
	let { id } = useParams();
	const dispatch = useDispatch();

	const reviewsData = useSelector(state => state.reviews);
	const user = localStorage.getItem('username');

	const [review, setReview] = useState({
		username: user,
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

		console.log(review)
		try {
			await axios.post(`${id}/review`, review, options).then(
				setTimeout(() => {
					dispatch(getMovieReviews(id))
				}, 50)
			);

			setReview({
				rating: 0,
				reviewText: ''
			})
		} catch (error) {
			setErrorMSG(error.response.data.message)
			return clearMSG();
		};
	};

	console.log(reviewsData)

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
							username: user,
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
					style={{ width: '100%', background: '#101010', color: '#ef720f', padding: '0.5rem', marginBottom: 5 }}
					onChange={(e) => setReview({
						...review,
						username: user,
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
					{(Array.isArray(reviewsData?.data?.reviews) && reviewsData?.data?.reviews.length) ?
						<Grid
							container
							spacing={2}
						>
							<Reviews reviews={reviewsData?.data} />
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
			</CardContent>
		</Grid>
	)
}

export default ReviewMovie