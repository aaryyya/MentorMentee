import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import { getMentorProfileByUserId } from '../../api/mentorProfileApi';
import placeholderImg from "../../assets/images/profile.webp";
import { getCurrentUser } from '../../api/authApi';

const MyMentor = () => {
  const [mentor, setMentor]     = useState(null);
  const [loading, setLoading]   = useState(true);
  // const [error, setError]     = useState(null);

  useEffect(() => {
    async function fetchMentor() {
      try {
        const { data: { user } } = await getCurrentUser();
        if (!user.mentorId) throw new Error("No mentor assigned");
        const { data: { profile } } = await getMentorProfileByUserId(user.mentorId);
        setMentor(profile);
      } catch (err) {
        console.error("Error loading mentor:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMentor();
  }, []);
  

  if (loading) return <div className="p-8">Loading Mentor…</div>;
  // if (error)   return <div className="p-8 text-red-500">{error}</div>;
  if (!mentor) return <div className="p-8">You don’t have a mentor yet.</div>;

  return (
    <div className="flex">
      <Sidebar role="mentee" />
      <div className="flex-1 min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Mentor</h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <img
                  src={mentor.profileImage || placeholderImg}
                  alt={mentor.fullName}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{mentor.fullName}</h2>
                  <p className="text-lg text-blue-600 font-medium">{mentor.title}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Experience</h3>
                  <p className="mt-1 text-gray-700">{mentor.experience}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Expertise Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill,i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Bio</h3>
              <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMentor;
