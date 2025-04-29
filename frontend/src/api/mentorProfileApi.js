// 1️⃣ frontend/src/api/mentorProfileApi.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});

export const getMyMentorProfile = () =>
  axios.get(`${API_BASE_URL}/mentor/profile/me`, authHeader());

/** Fetch any mentor profile by its ID */
export const getMentorProfileById = (id) =>
  axios.get(`${API_BASE_URL}/mentor/profile/${id}`, authHeader());

/** Update a mentor profile by its ID */
export const updateMentorProfile = (id, data) =>
  axios.put(`${API_BASE_URL}/mentor/updateprofile/${id}`, data, authHeader());

// fetch by mentor’s userId:
export const getMentorProfileByUserId = (userId) =>
  axios.get(`${API_BASE_URL}/mentor/profile/user/${userId}`, authHeader());
