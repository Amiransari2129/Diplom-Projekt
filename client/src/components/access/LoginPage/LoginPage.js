import { Card, CardContent, Grid, TextField, Typography, Box, Button, Link, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { auth } from '../../../firebase-config';

const LoginPage = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});

	const [errorMSG, setErrorMSG] = useState('');

	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
		}, 5000);
	}

	useEffect(() => {
		if (localStorage.getItem('uid')) {
			navigate('/');
		}
	}, [navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await signInWithEmailAndPassword(auth, userData.email, userData.password);
			localStorage.setItem('uid', user.user.uid)

			navigate('/')
		} catch (error) {
			setErrorMSG(error.message)
			return clearMSG();
		};
	};

	return (
		<Grid
			container
			alignItems='center'
			justifyContent='center'
			direction='column'
			style={{ minHeight: '100vh' }}
		>
			<Grid item>
				<Card raised elevation={8}>
					<CardContent>
						<Typography variant='h4' align='center'>Meevies</Typography>
						<Box component='form' onSubmit={(e) => handleLogin(e)} noValidate xs={1} alignItems='center'>
							<Box textAlign='center' width={300}>
								<TextField
									type='email'
									margin='normal'
									required
									fullWidth
									label='Email Address'
									autoComplete='email'
									autoFocus
									onChange={(e) => setUserData({
										...userData,
										email: e.target.value
									})}
								/>
								<TextField
									type='password'
									margin='normal'
									required
									fullWidth
									label='Password'
									autoComplete='Password'
									onChange={(e) => setUserData({
										...userData,
										password: e.target.value
									})}
								/>
							</Box>

							<Box textAlign='center' sx={{ mb: '7px' }} >
								<Button variant='outlined' type='submit' fullWidth>Login</Button>
							</Box>
							<Box textAlign='center' sx={{ mb: '7px' }} width={300}>
								{errorMSG &&
									<Alert variant="outlined" severity="error" sx={{ background: '#030303' }}>
										{errorMSG}
									</Alert>}
							</Box>

						</Box>

						<Grid container>
							<Grid item xs>
								<Link href='/register'>
									Sign Up
								</Link>
							</Grid>
							<Grid item>
								<Link href='/forgotpassword'>
									Forgot password?
								</Link>

							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid >
		</Grid >
	)
}

export default LoginPage