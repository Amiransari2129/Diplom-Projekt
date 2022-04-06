import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import ForgotPassPage from './components/access/ForgotPassPage/ForgotPassPage'
import HomePage from './components/views/HomePage/HomePage';
import LoginPage from './components/access/LoginPage/LoginPage'
import PrivateRoute from './components/access/PrivateRoute/PrivateRoute';
import RegisterPage from './components/access/RegisterPage/RegisterPage'
import ResetPassPage from './components/access/ResetPassPage/ResetPassPage'

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
      default: '#131313',
      paper: '#131313'
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/forgotpassword' element={<ForgotPassPage />} />
        <Route exact path='/resetpassword/:token' element={<ResetPassPage />} />
        {/* <Route exact path='/movies' element={<PrivateRoute Component={LoginPage} />} />
        <Route exact path='/search' element={<PrivateRoute Component={LoginPage} />} /> */}
        <Route exact path='/' element={<PrivateRoute Component={HomePage} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
