import { Grid } from '@mui/material'
import React from 'react'
import Header from '../components/header/Header'

const layout = ({ children }) => {
	return (
		<>

			<Grid container spacing='2'>
				<Grid item xs={12}>
					<Header />
				</Grid>
				{children}
			</Grid>
		</>
	)
}

export default layout