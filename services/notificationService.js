
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch user notifications
export const fetchNotifications = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(`${API_URL}/api/notifications`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mark notification as read
export const markAsRead = async (notificationId) => {
  try {
    const response = await axios.put(`${API_URL}/api/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    const response = await axios.put(`${API_URL}/api/notifications/read-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get unread notification count
export const getUnreadCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/notifications/unread-count`);
    return response.data.count;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount
};
