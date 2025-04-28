// frontend/src/pages/mentor/MentorEditProfile.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaBriefcase, FaHistory, FaUserTie } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import {
  getMentorProfileById,
  updateMentorProfile
} from '../../api/mentorProfileApi';

const skills = [
  "Recursive Self-Doubt Optimization",
  "Quantum Debugging",
  "Infinite Loop Surfing",
  "Git Conflict Whispering",
  "404 Error Interpretation",
  "Syntax Charmcasting",
  "Multithreaded Napping",
  "Rubber Duck Possession",
  "Dark Mode Sorcery",
  "Stack Overflow Necromancy",
  "AI Model Flirting",
  "Legacy Code Archaeology",
  "Null Pointer Taming",
  "Coffee-to-Code Conversion",
  "Variable Name Poetry"
];

const MentorEditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    bio: '',
    experience: '',
    expertise: []
  });
  const [profileImage, setProfileImage] = useState('');
  const [expertiseInput, setExpertiseInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  // Load existing profile on mount
  useEffect(() => {
    if (!id) return;
    getMentorProfileById(id)
      .then(res => {
        const p = res.data.profile;
        setFormData({
          fullName: p.fullName,
          title: p.title,
          bio: p.bio,
          experience: p.experience,
          expertise: p.expertise || []
        });
        setProfileImage(p.profileImage || '');
      })
      .catch(err => console.error('Load profile error:', err));
  }, [id]);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (formData.bio.length > 500) newErrors.bio = 'Max 500 chars';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSkill = skill => {
    if (skill && !formData.expertise.includes(skill)) {
      setFormData(prev => ({ ...prev, expertise: [...prev.expertise, skill] }));
    }
    setExpertiseInput('');
  };

  const removeSkill = skill => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(s => s !== skill)
    }));
  };

  const filteredSkills = skills.filter(s =>
    s.toLowerCase().includes(expertiseInput.toLowerCase()) &&
    !formData.expertise.includes(s)
  );

  const handleKeyDown = e => {
    if (e.key === 'Enter' && expertiseInput.trim()) {
      e.preventDefault();
      addSkill(expertiseInput.trim());
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formData, profileImage };
    try {
      await updateMentorProfile(id, payload);
      alert('Profile updated successfully!');
      navigate('/mentor/my-account');
    } catch (err) {
      console.error('Update error:', err);
      alert(err.response?.data?.message || 'Update failed.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="mentor" />
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
            {/* Profile Picture */}
            <div className="mb-6 flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                {profileImage ? (
                  <img src={profileImage} className="w-full h-full object-cover" />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Upload</span>
                  </div>
                )}
              </div>
              <input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <label htmlFor="profileImage" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Change Photo
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Experience</label>
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
                </div>
              </div>

              {/* Right */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Bio</label>
                  <textarea
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.bio && <p className="text-red-500 text-xs">{errors.bio}</p>}
                </div>
                <div className="mb-4 relative" ref={containerRef}>
                  <label className="block text-gray-700 font-bold mb-2">Expertise</label>
                  <div className="relative">
                    <input
                      value={expertiseInput}
                      onChange={e => { setExpertiseInput(e.target.value); setShowDropdown(true); }}
                      onKeyDown={handleKeyDown}
                      placeholder="Type or select skill"
                      className="w-full border rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDropdown(s => !s)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >▼</button>
                  </div>
                  {showDropdown && filteredSkills.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                      {filteredSkills.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => { addSkill(s); setShowDropdown(false); }}
                          className="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                        >{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.expertise.map((s, i) => (
                      <span
                        key={i}
                        onClick={() => removeSkill(s)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer"
                      >
                        {s} ×
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorEditProfile;
