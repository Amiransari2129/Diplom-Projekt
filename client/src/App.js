import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import PrivateRoute from './components/access/PrivateRoute/PrivateRoute';
import LoginPage from './components/access/LoginPage/LoginPage'
import RegisterPage from './components/access/RegisterPage/RegisterPage'
import ForgotPassPage from './components/access/ForgotPassPage/ForgotPassPage'
import ResetPassPage from './components/access/ResetPassPage/ResetPassPage'

import HomePage from './components/views/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/forgotpassword' element={<ForgotPassPage />} />
        <Route exact path='/resetpassword/:token' element={<ResetPassPage />} />
        {/* <Route exact path='/movies' element={<PrivateRoute Component={LoginPage} />} />
        <Route exact path='/search' element={<PrivateRoute Component={LoginPage} />} /> */}
        <Route exact path='/' element={<PrivateRoute Component={HomePage} />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
