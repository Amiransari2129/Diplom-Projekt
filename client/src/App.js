import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import ForgotPassPage from './components/access/ForgotPassPage/ForgotPassPage';
import LoginPage from './components/access/LoginPage/LoginPage';
import PrivateRoute from './components/access/PrivateRoute/PrivateRoute';
import RegisterPage from './components/access/RegisterPage/RegisterPage';
import ResetPassPage from './components/access/ResetPassPage/ResetPassPage';

import HomePage from './components/views/HomePage/HomePage';
import DiscoveryPage from './components/views/DiscoverPage/DiscoverPage';
import SearchPage from './components/views/SearchPage/SearchPage';
import AllMoviesPage from './components/views/AllMovies/AllMovies';
import ProfilePage from './components/views/ProfilePage/ProfilePage';
import WatchlistPage from './components/views/Watchlist/Watchlist';
import MovieDetailsPage from './components/views/MoviesDetailsPage/MovieDetailsPage'

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ef720f',
      contrastText: '#ef720f',
    },
    text: {
      primary: '#ef720f',
      secondary: '#ef720f',
    },
    background: {
      default: '#080808',
      paper: '#131313'
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/forgotpassword' element={<ForgotPassPage />} />
        <Route exact path='/resetpassword/:token' element={<ResetPassPage />} />
        <Route exact path='/movies/:id' element={<PrivateRoute Component={MovieDetailsPage} />} />
        <Route exact path='/discover' element={<PrivateRoute Component={DiscoveryPage} />} />
        <Route exact path='/profile' element={<PrivateRoute Component={ProfilePage} />} />
        <Route exact path='/watchlist' element={<PrivateRoute Component={WatchlistPage} />} />
        <Route exact path='/search' element={<PrivateRoute Component={SearchPage} />} />
        <Route exact path='/all%20movies' element={<PrivateRoute Component={AllMoviesPage} />} />
        <Route exact path='/' element={<PrivateRoute Component={HomePage} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
