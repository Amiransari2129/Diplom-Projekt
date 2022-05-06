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
										<Alert variant="outlined" severity="error" sx={{ background: '#030303' }}>
											{errorMSG}
										</Alert>}
									{successMSG &&
										<Alert variant="outlined" severity="success" sx={{ background: '#030303' }}>
											{successMSG}
										</Alert>}
								</Box>
							</Box>

							<Box textAlign='center' sx={{ mb: '10px' }}>
								<Button variant='outlined' type='submit' fullWidth>Create Account</Button>
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

export default RegisterPage