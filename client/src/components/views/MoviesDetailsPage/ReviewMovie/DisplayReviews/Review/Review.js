import { Card, CardContent, Typography } from '@mui/material'
import { Star } from '@mui/icons-material';
import React from 'react'

const Review = (review) => {
	console.log(review)
	return (
		<Card raised elevation={8} >
			<CardContent>
				<Typography variant='h5' gutterBottom >
					{review?.review?.rating} <Star />
				</Typography>
				<Typography variant='body2' gutterBottom>
					By {review?.username}
				</Typography>
				<Typography variant='body1'
					sx={{
						display: '-webkit-box',
						overflow: 'hidden',
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: 5,
					}}>
					{review?.review?.reviewText}
				</Typography>
			</CardContent>
		</Card >
	)
}

export default Review