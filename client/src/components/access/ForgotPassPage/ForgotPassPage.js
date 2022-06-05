import { Alert, Box, Button, Card, CardContent, Grid, Link, TextField, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'

import { auth } from '../../../firebase-config';

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

		try {
			await sendPasswordResetEmail(auth, email)
			setSuccessMSG('Email has been sent!')
			clearMSG()
		} catch (error) {
			setErrorMSG(error.message)
			clearMSG()
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
						<Box component='form' onSubmit={(e) => handleForgotPass(e)} noValidate xs={1} alignItems='center'>

							<TextField
								type='email'
								margin='normal'
								required
								fullWidth
								label='Email Address'
								autoComplete='email'
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Box textAlign='center' sx={{ mb: '10px' }}>
								{errorMSG &&
									<Alert variant="outlined" severity="error" sx={{ background: '#030303' }}>
										{errorMSG}
									</Alert>}
								{successMSG &&
									<Alert variant="outlined" severity="success" sx={{ background: '#030303' }}>
										{successMSG}
									</Alert>}
							</Box>

							<Box textAlign='center' sx={{ mb: '10px' }}>
								<Button variant='outlined' type='submit' fullWidth>Reset Password</Button>
							</Box>

							<Box textAlign='center' sx={{ mb: '-10px' }}>
								<Link href='/login'>
									Return to Login
								</Link>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Grid >
		</Grid >
	)
}

export default ForgotPassPage