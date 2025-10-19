import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import session from 'express-session';
import flash from 'express-flash';
import { attachUser } from './middleware/attachUser.js';

dotenv.config();

import indexRouter from './routes/index.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// View engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware - ORDER MATTERS!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(attachUser);

// Session middleware (must come before flash)
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
}));

// Flash middleware (must come after session)
app.use(flash());

// Routes (must come before the flash messages middleware)
app.use('/', authRoutes);
app.use('/', indexRouter);


// Make flash messages available to all templates - MUST COME AFTER ROUTES!
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null; 
  next();
});

// export the app
export default app;