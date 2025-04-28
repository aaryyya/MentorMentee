// backend/src/index.js

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { app } from './app.js';
import { connectDB } from './db/indexDB.js';

const PORT = process.env.PORT || 3001;

// List all allowed origins (front-end URLs)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  // add more if needed (e.g. staging URL)
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Origin not allowed'), false);
    },
    credentials: true,           // allows Access-Control-Allow-Credentials header
    exposedHeaders: ['Authorization'], // if you send JWT in headers
  })
);

// (Optional) If you parse cookies anywhere, you’d also need:
// import cookieParser from 'cookie-parser';
// app.use(cookieParser());

// Now connect to Mongo and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });