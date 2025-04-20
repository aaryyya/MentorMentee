import mongoose from 'mongoose';

const MentorProfileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, maxlength: 500 }, // Maximum length of bio can be 500 characters
    experience: { type: String, required: true },
    expertise: { type: [String], default: [] }, // Array of expertise areas
    profileImage: { type: String }, // Store either Base64 string or URL of the image
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to the 'User' model
      required: true 
    }
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const MentorProfile = mongoose.model('MentorProfile', MentorProfileSchema);

export default MentorProfile;
