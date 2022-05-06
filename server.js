import dotenv from 'dotenv'
dotenv.config({ path: './config.env' });

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import movieRoutes from './routes/movies.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
	origin: '*',
}));

app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
	.then(() => app.listen(PORT, () => console.log(`Server Listening on port: ${PORT}`)))
	.catch((error) => console.log(error.message));


// https://www.mongodb.com/cloud/atlas
