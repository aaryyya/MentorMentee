import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser      // ← new
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

// Get current user info (requires valid Bearer token)
router.get('/me', authMiddleware, getCurrentUser);

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

export default router;
