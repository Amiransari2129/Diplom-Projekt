import express from 'express';

import { forgotPassword, getProfile, login, register, resetPassword, updateProfile } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);

router.put('/getprofile', getProfile);
router.post('/updateprofile', updateProfile);

export default router;