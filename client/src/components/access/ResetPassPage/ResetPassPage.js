import { Alert, Box, Button, Card, CardContent, Grid, TextField, Typography, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react'

const ResetPassPage = () => {
	const params = useParams();
	const [password, setPassword] = useState({
		password: '',
		passwordConfirm: ''
	});

	const [errorMSG, setErrorMSG] = useState('');
	const [successMSG, setSuccessMSG] = useState('');

	const clearMSG = () => {
		setTimeout(() => {
			setErrorMSG('')
			setSuccessMSG('')
		}, 5000);
	}

	const handleResetPass = async (e) => {
		e.preventDefault();

		const options = {
			header: {
				'Content-Type': 'application/json'
			},
		};

		if (password.password !== password.passwordConfirm) {
			setPassword({
				password: '',
				passwordConfirm: ''
			});
			setErrorMSG('Passwords do not match')
			return clearMSG()
		};

		try {
			const { data } = await axios.put(`/auth/resetpassword/${params.token}`, password, options);
			console.log(data.error)
			setSuccessMSG('Password has been changed!')
			return clearMSG()
		} catch (error) {
			setErrorMSG(error.response?.data.error)
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
						<Typography variant='h4' align='center'>Reset Password</Typography>
						<Box component='form' onSubmit={(e) => handleResetPass(e)} noValidate xs={1}>
							<Box textAlign='center' width={300}>
								<TextField
									type='password'
									margin='normal'
									required
									fullWidth
									label='Password'
									autoComplete='password'
									onChange={(e) => setPassword({
										...password,
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
									onChange={(e) => setPassword({
										...password,
										passwordConfirm: e.target.value
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
								<Button variant='outlined' type='submit' fullWidth>Change Password</Button>
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

export default ResetPassPage