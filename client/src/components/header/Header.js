import React, { useState } from 'react';

import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Button, Tooltip } from '@mui/material';
import { Menu as MenuIcon, AccountCircle as Avatar } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

const views = ['Discover', 'Search', 'All Movies'];
const settings = ['Profile', 'Logout'];

const Header = () => {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);

	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleUserChoice = (setting) => {
		if (setting === 'Profile') {
			navigate(`/${setting}`);
		} else {
			localStorage.removeItem('token');
			navigate('/login');
		}
	}

	const handleNavChoice = (view) => {
		navigate(`/${view}`);
	}

	return (
		<AppBar
			position='static'
			sx={{ backgroundColor: 'inherit' }}
		>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h5'
						noWrap
						onClick={() => navigate('./')}
						sx={{ display: { xs: 'none', md: 'flex' } }}
					>
						Meevies
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={anchorElNav}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { md: 'none' },
							}}
						>
							{views.map((view) => (
								<MenuItem key={view} onClick={() => handleNavChoice(view)}>
									<Typography textAlign='center' >{view}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h5'
						noWrap
						sx={{ flexGrow: 1, display: { md: 'none' } }}
					>
						Meevies
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{views.map((view) => (
							<Button
								variant='outline'
								name={view}
								key={view}
								onClick={() => handleNavChoice(view)}
							>
								{view}
							</Button>
						))}
					</Box>

					<Box >
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} >
								<Avatar alt='Remy Sharp' style={{ color: 'ef720f' }} />
							</IconButton>
						</Tooltip>
						<Menu
							anchorEl={anchorElUser}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={() => handleUserChoice(setting)}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header