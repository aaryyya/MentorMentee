
// 2) Update frontend/src/pages/mentor/MentorMyAccount.jsx

import React, { useEffect, useState } from 'react';
import { FaEdit, FaBriefcase, FaHistory, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { getMyMentorProfile } from '../../api/mentorProfileApi';

const MentorAccount = () => {
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyMentorProfile()
      .then(res => {
        if (res.data.success) setMentorData(res.data.profile);
        else setError('Unable to fetch profile');
      })
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading profile…</div>;
  if (error)   return <div className="p-8 text-red-500">{error}</div>;
  if (!mentorData) return <div className="p-8">Profile not found. Please create your profile.</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar role="mentor" />
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 flex items-center">
              <FaUserTie className="inline-block mr-2" /> Mentor Profile
            </h1>
            <Link
              to={`/mentor/edit-profile/${mentorData._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FaEdit className="inline-block mr-2" /> Edit Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  {mentorData.profileImage ? (
                    <img
                      src={mentorData.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-blue-600">
                      {mentorData.fullName.charAt(0)}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {mentorData.fullName}
                </h2>
                <p className="text-blue-600 mb-4 flex items-center">
                  <FaBriefcase className="inline-block mr-2" /> {mentorData.title}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <FaHistory className="inline-block mr-2" /> {mentorData.experience}
                </p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Professional Bio
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {mentorData.bio || 'Add your professional bio to tell mentees about yourself.'}
                </p>
              </section>

              <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mentorData.expertise.length > 0 ? (
                    mentorData.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">Add your areas of expertise.</p>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Professional Experience
                </h3>
                <div className="border-l-4 border-blue-200 pl-4">
                  <p className="text-gray-600">
                    {mentorData.experience}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAccount;
