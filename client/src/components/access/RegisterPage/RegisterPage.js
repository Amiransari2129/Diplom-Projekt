import { Alert, Box, Button, Card, CardContent, Grid, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RegisterPage = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [errorMSG, setErrorMSG] = useState('');
	const [successMSG, setSuccessMSG] = useState('');

	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
			setSuccessMSG('')
		}, 5000);
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/')
		}
	}, [navigate])

	const handleRegister = async (e) => {
		e.preventDefault();

		const options = {
			header: {
				'Content-Type': 'application/json'
			}
		};

		if (userData.password !== userData.confirmPassword) {
			setUserData({
				...userData,
				password: '',
				confirmPassword: ''
			});
			return setErrorMSG('Passwords do not match')
		};

		try {
			const { data } = await axios.post('auth/register', userData, options);

			localStorage.setItem('token', data?.token);

			navigate('/')
		} catch (error) {
			setErrorMSG(error.response.data.error)
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
				<Card variant='outlined'>
					<CardContent>
						<Typography variant='h4' align='center'>Sign Up</Typography>
						<Box component='form' onSubmit={(e) => handleRegister(e)} noValidate xs={1}>
							<Box textAlign='center' width={300}>
								<TextField
									type='text'
									margin='normal'
									required
									fullWidth
									label='Username'
									autoComplete='username'
									autoFocus
									onChange={(e) => setUserData({
										...userData,
										username: e.target.value
									})}
								/>
								<TextField
									type='email'
									margin='normal'
									required
									fullWidth
									label='Email Address'
									autoComplete='email'
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
									autoComplete='password'
									onChange={(e) => setUserData({
										...userData,
										password: e.target.value
									})}
								/>
								<TextField
									type='password'
									margin='normal'
									required
									fullWidth
									label='Confirm Password'
									autoComplete='password'
									onChange={(e) => setUserData({
										...userData,
										confirmPassword: e.target.value
									})}
								/>
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
							</Box>

							<Box textAlign='center' sx={{ mb: '7px' }}>
								<Button variant='outlined' type='submit' fullWidth>Create Account</Button>
							</Box>
						</Box>
						<Grid container>
							<Grid item>
								<Box >
									<Link href='/login' >
										Return to Login
									</Link>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid >
		</Grid >
	)
}

export default RegisterPage