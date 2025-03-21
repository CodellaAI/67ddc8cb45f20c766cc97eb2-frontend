
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create a new tweet
export const createTweet = async (tweetData) => {
  try {
    const response = await axios.post(`${API_URL}/api/tweets`, tweetData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch timeline tweets
export const fetchTimeline = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/api/tweets/timeline`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch trending tweets
export const fetchTrendingTweets = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/api/tweets/trending`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single tweet by ID
export const fetchTweet = async (tweetId) => {
  try {
    const response = await axios.get(`${API_URL}/api/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Like a tweet
export const likeTweet = async (tweetId) => {
  try {
    const response = await axios.post(`${API_URL}/api/tweets/${tweetId}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Retweet a tweet
export const retweetTweet = async (tweetId) => {
  try {
    const response = await axios.post(`${API_URL}/api/tweets/${tweetId}/retweet`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reply to a tweet
export const replyToTweet = async (tweetId, replyData) => {
  try {
    const response = await axios.post(`${API_URL}/api/tweets/${tweetId}/reply`, replyData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch replies to a tweet
export const fetchTweetReplies = async (tweetId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/api/tweets/${tweetId}/replies`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a tweet
export const deleteTweet = async (tweetId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search tweets
export const searchTweets = async (query, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/api/tweets/search`, {
      params: { query, page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createTweet,
  fetchTimeline,
  fetchTrendingTweets,
  fetchTweet,
  likeTweet,
  retweetTweet,
  replyToTweet,
  fetchTweetReplies,
  deleteTweet,
  searchTweets
};
