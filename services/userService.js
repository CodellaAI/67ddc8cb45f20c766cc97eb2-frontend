
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch user profile
export const fetchUserProfile = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch user tweets
export const fetchUserTweets = async (username, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${username}/tweets`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Follow a user
export const followUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/${userId}/unfollow`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/api/users/profile`, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get suggested users to follow
export const getSuggestedUsers = async (limit = 3) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/suggestions`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search users
export const searchUsers = async (query, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/search`, {
      params: { query, page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchUserProfile,
  fetchUserTweets,
  followUser,
  unfollowUser,
  updateProfile,
  getSuggestedUsers,
  searchUsers
};
