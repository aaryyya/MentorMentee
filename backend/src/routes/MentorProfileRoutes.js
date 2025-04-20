import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  createMentorProfile,
  getAllMentorProfiles,
  getMentorProfileById,
  updateMentorProfile
} from '../controllers/MentorProfileController.js';

const router = express.Router();

// 🔒 Get all mentor profiles (GET /mentor/profiles)
router.get('/profiles', authMiddleware, getAllMentorProfiles);

// 🔒 Create a new mentor profile (POST /mentor/profile)
router.post('/profile', authMiddleware, createMentorProfile);

// 🔒 Get a single mentor profile by ID (GET /mentor/profile/:id)
router.get('/profile/:id', authMiddleware, getMentorProfileById);

// 🔒 Update mentor profile (PUT /mentor/Updateprofile/:id)
router.put('/Updateprofile/:id', authMiddleware, updateMentorProfile);

export default router;
