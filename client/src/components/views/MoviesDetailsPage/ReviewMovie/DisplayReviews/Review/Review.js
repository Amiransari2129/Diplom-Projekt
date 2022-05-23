import { Card, CardContent, Typography } from '@mui/material'
import { Star } from '@mui/icons-material';
import moment from 'moment';
import React from 'react'

const Review = (review) => {
	const createdAt = moment(review?.review?.date).format('MMMM Do HH:mm');
	return (
		<Card raised elevation={8} >
			<CardContent>
				<Typography variant='h5' >
					{review?.review?.rating} <Star />
				</Typography>
				<Typography variant='body2' gutterBottom>
					By {review?.username}
				</Typography>
				<Typography variant='body1' gutterBottom
					sx={{
						display: '-webkit-box',
						overflow: 'hidden',
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: 5,
					}}>
					{review?.review?.reviewText}
				</Typography>
				<Typography variant='body2'>
					{createdAt}
				</Typography>
			</CardContent>
		</Card >
	)
}

export default Review