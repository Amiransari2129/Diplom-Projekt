import { Grid } from '@mui/material'
import React from 'react'

import Review from './Review/Review'

const DisplayReviews = (reviews, username) => {
	return (
		<>
			{reviews.reviews?.map((review) => (
				<Grid item xs={12} md={4} lg={3} key={review._id}>
					<Review review={review} username={reviews.username} />
				</Grid>
			))
			}
		</>
	)
}

export default DisplayReviews