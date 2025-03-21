
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch trending topics
export const fetchTrendingTopics = async (limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}/api/trending`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    // For demo purposes, return mock data if API fails
    return [
      {
        id: 1,
        name: '#JavaScript',
        category: 'Programming',
        tweetCount: 125000
      },
      {
        id: 2,
        name: '#React',
        category: 'Technology',
        tweetCount: 98000
      },
      {
        id: 3,
        name: '#NextJS',
        category: 'Technology',
        tweetCount: 75000
      },
      {
        id: 4,
        name: '#TailwindCSS',
        category: 'Design',
        tweetCount: 62000
      },
      {
        id: 5,
        name: '#WebDevelopment',
        category: 'Technology',
        tweetCount: 45000
      }
    ];
  }
};

export default {
  fetchTrendingTopics
};
