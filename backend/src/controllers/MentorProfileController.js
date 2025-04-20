import MentorProfile from '../models/MentorProfile.js';
import User from '../models/User.js';

// Create a new mentor profile (with empty fields)
export const createMentorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Access denied. Only mentors can create profiles.' });
    }

    // Check if mentor profile already exists
    const existingProfile = await MentorProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Mentor profile already exists.' });
    }

    // Create an empty mentor profile with only userId
    const newProfile = new MentorProfile({
      userId,
      fullName: '', // Empty initially
      title: '',    // Empty initially
      bio: '',      // Empty initially
      expertise: [],// Empty array initially
      experience: '', // Empty initially
      profileImage: '', // Empty initially
    });

    await newProfile.save();

    return res.status(201).json({ success: true, message: 'Mentor profile created successfully.', profile: newProfile });
  } catch (error) {
    console.error('Error creating mentor profile:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single mentor profile by ID
export const getMentorProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await MentorProfile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Mentor profile not found.' });
    }
    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error('Error fetching mentor profile:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all mentor profiles
export const getAllMentorProfiles = async (req, res) => {
  try {
    const profiles = await MentorProfile.find();
    return res.status(200).json({ success: true, profiles });
  } catch (error) {
    console.error('Error fetching all mentor profiles:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an existing mentor profile by ID
export const updateMentorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const user = await User.findById(userId);
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Access denied. Only mentors can update profiles.' });
    }

    const { fullName, title, bio, expertise, experience, profileImage } = req.body;
    if (!fullName || !title || !experience) {
      return res.status(400).json({ message: 'Full name, title, and experience are required.' });
    }

    const updated = await MentorProfile.findByIdAndUpdate(
      id,
      {
        $set: {
          fullName,
          title,
          bio: bio || '',
          expertise: expertise || [],
          experience,
          profileImage: profileImage || ''
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Mentor profile not found.' });
    }

    return res.status(200).json({ success: true, profile: updated });
  } catch (error) {
    console.error('Error updating mentor profile:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
