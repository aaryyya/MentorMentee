import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  createMentorProfile,
  getAllMentorProfiles,
  getMentorProfileById,
  getMyMentorProfile,
  updateMentorProfile
} from '../controllers/MentorProfileController.js';

const router = express.Router();

// 🔒 Get all mentor profiles
router.get('/profiles', authMiddleware, getAllMentorProfiles);

// 🔒 Create a new mentor profile
router.post('/profile', authMiddleware, createMentorProfile);

// 🔒 Get current logged-in mentor's own profile
router.get('/profile/me', authMiddleware, getMyMentorProfile);

// 🔒 Get a single mentor profile by ID
router.get('/profile/:id', authMiddleware, getMentorProfileById);

// 🔒 Update mentor profile by ID
router.put('/updateprofile/:id', authMiddleware, updateMentorProfile);

export default router;
