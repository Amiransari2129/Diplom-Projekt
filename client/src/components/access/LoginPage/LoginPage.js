import { Card, CardContent, Grid, TextField, Typography, Box, Button, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
		if (localStorage.getItem('token')) {
			navigate('/');
		}
	}, [navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();

		const options = {
			header: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const { data } = await axios.post('/auth/login', userData, options);
			localStorage.setItem('token', data?.token);
			localStorage.setItem('username', data?.username);

			navigate('/')
		} catch (error) {
			setErrorMSG(error.response.data.message)
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