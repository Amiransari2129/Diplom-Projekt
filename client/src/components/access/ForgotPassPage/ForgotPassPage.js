import { Alert, Box, Button, Card, CardContent, Grid, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

const ForgotPassPage = () => {
	const [email, setEmail] = useState('');

	const [errorMSG, setErrorMSG] = useState('');
	const [successMSG, setSuccessMSG] = useState('');

	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
			setSuccessMSG('')
		}, 5000);
	}

	const handleForgotPass = async (e) => {
		e.preventDefault();

		const options = {
			header: {
				'Content-Type': 'application/json'
			},
		};

		try {
			await axios.post('/auth/forgotpassword', { email }, options);

			setSuccessMSG('Email has been sent!')
			return clearMSG()
		} catch (error) {
			setErrorMSG(error.response.data.error);
			return clearMSG()
		}
	}

	return (
		<Grid
			container
			alignItems='center'
			justifyContent='center'
			direction='column'
			style={{ minHeight: '100vh' }}
		>
			<Grid item>
				<Card variant='outlined'>
					<CardContent>
						<Typography variant='h4' align='center'>Recover Password</Typography>
						<Box component='form' onSubmit={(e) => handleForgotPass(e)} noValidate xs={1}>
							<Box textAlign='center' width={300}>
								<TextField
									type='email'
									margin='normal'
									required
									fullWidth
									label='Email Address'
									autoComplete='email'
									autoFocus
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Box>
							<Box textAlign='center' sx={{ mb: '7px' }}>
								{errorMSG &&
									<Alert variant="outlined" severity="error">
										{errorMSG}
									</Alert>}
								{successMSG &&
									<Alert variant="outlined" severity="success">
										{successMSG}
									</Alert>}
							</Box>
							<Box textAlign='center' sx={{ mb: '7px' }}>
								<Button variant='outlined' type='submit' fullWidth>Send Password Reset Email</Button>
							</Box>
						</Box>
						<Grid container>
							<Grid item xs>
								<Link href='/login'>
									Return to Login
								</Link>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid >
		</Grid >
	)
}

export default ForgotPassPage