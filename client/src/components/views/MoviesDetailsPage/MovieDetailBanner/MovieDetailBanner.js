import { Box, Button, Card, CardContent, CardMedia, Grid, Modal, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'

import PosterNotFound from '../../MoviePosters/MoviePoster/PosterNotFound/images.png'
import ExtendedCastList from '../../MoviesDetailsPage/CastList/ExtendedCastList/ExtendedCastList'

const MovieDetailBanner = ({ movie, extendedCast, CDW, awards }) => {
	const [open, setOpen] = useState({
		trailer: false,
		extendedCast: false,
		awardInfo: false,
	});

	const handleClose = () => setOpen({
		trailer: false,
		extendedCast: false,
		awardInfo: false,
	});


	const earnings = useSelector(state => state.earnings);

	const genreFormatter = (genArr) => {
		if (!Array.isArray(genArr)) return;
		return (
			genArr.map((genre) => (
				<span key={genre.id}> {genre.genre}</span>
			))
		);
	};

	const seperator = ', ';
	const writerFormatted = CDW?.writers?.map((writer) => writer?.credits?.map((writer) => writer?.name?.nameText?.text)).join(seperator);
	const directorFormatted = CDW?.directors?.map((director) => director?.credits?.map((director) => director?.name?.nameText?.text)).join(seperator);

	const numFormatter = (amount) => {
		if (amount > 999 && amount < 1000000) {
			return (amount / 1000).toFixed(1) + 'K';
		} else if (amount > 1000000) {
			return (amount / 1000000).toFixed(1) + 'M';
		} else if (amount < 900) {
			return amount;
		};
	};

	return (
		<Grid container spacing={2} sx={{ pt: '2rem' }} justifyContent='center' alignItems='center'>
			<Grid item xs={9} md={3.8} lg={2}>
				<CardMedia
					component='img'
					src={movie.banner}
					onError={({ image }) => {
						image.onerror = null;
						image.src = PosterNotFound;
					}}
					alt={movie.title}
					style={{ borderRadius: '5px', boxShadow: '0rem 0.5rem 1.5rem #000000' }}
				/>
			</Grid>

			<Grid item xs={9} md={4} lg={4} align='center'>
				<Card raised elevation={8}>
					<CardContent>
						<Typography variant='h3' gutterBottom
							sx={{
								display: '-webkit-box',
								overflow: 'hidden',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 2,
							}}
						>
							{movie.title}
						</Typography>
						<Typography variant='body2' gutterBottom >
							Directed by {directorFormatted}
						</Typography>
						<Typography variant='body2' gutterBottom >
							Written By {writerFormatted}
						</Typography>
						<Typography variant='body2' gutterBottom >
							{movie.release} • {genreFormatter(movie.gen)} • {movie.movie_length}m
						</Typography>
						<Typography variant='h6' >
							Plot
						</Typography>
						<Typography variant='body2' gutterBottom>
							{movie.plot}
						</Typography>
						{earnings?.productionBudget?.budget?.amount &&
							<>
								<Typography variant='h6'>
									Box office
								</Typography><Box display='flex' gap={1} justifyContent='center'>
									<Typography component='span' variant='body1' gutterBottom>
										Opening Weekend:
										<Typography variant='body2' gutterBottom>
											${numFormatter(earnings?.openingWeekendGross?.gross?.total?.amount)}
										</Typography>
									</Typography>
									<Typography component='span' variant='body1' gutterBottom>
										Life Time:
										<Typography variant='body2' gutterBottom>
											${numFormatter(earnings?.lifetimeGross?.total?.amount)}
										</Typography>
									</Typography>
									<Typography component='span' variant='body1' gutterBottom>
										World Wide:
										<Typography variant='body2' gutterBottom>
											${numFormatter(earnings?.worldwideGross?.total?.amount)}
										</Typography>
									</Typography>
									<Typography component='span' variant='body1' gutterBottom>
										Budget:
										<Typography variant='body2' gutterBottom>
											${numFormatter(earnings?.productionBudget?.budget?.amount)}
										</Typography>
									</Typography>
								</Box>
							</>}
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={9} md={3.8} lg={1.6}>
				<Card raised elevation={8} align='center'>
					<CardContent >

						<Button variant='outlined' onClick={() => setOpen({
							...open,
							trailer: true,
						})} sx={{ mt: '1rem', mb: '1rem' }} >Watch Trailer</Button>

						<Button variant='outlined' onClick={() => setOpen({
							...open,
							extendedCast: true,
						})} sx={{ mt: '1rem', mb: '1rem' }}>Extended Cast</Button>

						<Button variant='outlined' onClick={() => setOpen({
							...open,
							awardInfo: true,
						})} sx={{ mt: '1rem', mb: '1rem' }}>Award Details</Button>

					</CardContent>
				</Card>
			</Grid>

			<Modal
				open={open.trailer}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '80%',
					height: '80%',
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					padding: 1
				}}>
					<CardMedia
						component='iframe'
						src={movie.trailer}
						style={{ borderRadius: '5px', border: '1px solid black', height: '100%' }}
					/>
				</Box>
			</Modal>

			<Modal
				open={open.extendedCast}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
				}}>
					<Typography variant='h4' align='center' sx={{ pb: 1 }}>Supporting Cast</Typography>
					<ExtendedCastList extendedCast={extendedCast} />
				</Box>
			</Modal>

			<Modal
				open={open.awardInfo}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					padding: 1
				}}>
					<Typography variant='h4' align='center'>
						Awards
					</Typography>
					<Box display='flex' gap={3} justifyContent='center'>
						<Typography variant='body1' gutterBottom >
							Nominations:
							<Typography variant='body2' gutterBottom align='center'>
								{awards?.nominations?.total}
							</Typography>
						</Typography>
						<Typography variant='body1' gutterBottom >
							Wins:
							<Typography variant='body2' gutterBottom align='center'>
								{awards?.wins?.total}
							</Typography>
						</Typography>
					</Box>
					{awards?.prestigiousAwardSummary &&
						(<>
							<Typography variant='body1' gutterBottom align='center'>
								Prestigious Awards:
								<Typography variant='body2' gutterBottom align='center'>
									{awards?.prestigiousAwardSummary?.award?.text}
								</Typography>
							</Typography><Typography variant='body1' gutterBottom align='center'>
								Total Nominations: {awards?.prestigiousAwardSummary?.nominations}
							</Typography><Typography variant='body1' gutterBottom align='center'>
								Total Wins: {awards?.prestigiousAwardSummary?.wins}
							</Typography>
						</>)}
				</Box>
			</Modal>
		</Grid >
	)
}

export default MovieDetailBanner