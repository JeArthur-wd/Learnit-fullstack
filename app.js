import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

import indexRouter from './routes/index.js';
import authRoutes from './routes/authRoutes.js';



const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');


// Middleware
app.use(express.urlencoded({ extended: true })); // <-- for form POST data
app.use(express.json());                         // <-- for JSON data
app.use(cookieParser());


app.use('/', authRoutes);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);

// export the app
export default app;
