import mongoose from 'mongoose';

const MentorProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 1000, // Increased slightly for safety (your example is ~250 chars)
      default: '',
      trim: true,
    },
    expertise: {
      type: [String],
      required: true,
      default: [], // Array of strings
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: '',
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true, // createdAt and updatedAt
    versionKey: false // Remove __v field
  }
);

const MentorProfile = mongoose.model('MentorProfile', MentorProfileSchema);

export default MentorProfile;
