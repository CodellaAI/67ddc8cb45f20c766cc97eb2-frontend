
'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import NotificationItem from '@/components/notifications/NotificationItem';
import { fetchNotifications, markAllAsRead } from '@/services/notificationService';
import { useAuth } from '@/hooks/useAuth';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const userNotifications = await fetchNotifications();
        setNotifications(userNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadNotifications();
      // Mark all as read when the page is opened
      markAllAsRead();
    }
  }, [user]);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold p-4 border-b">Notifications</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : notifications.length > 0 ? (
          <div>
            {notifications.map(notification => (
              <NotificationItem 
                key={notification._id} 
                notification={notification} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="text-5xl mb-4">🔔</div>
            <h2 className="text-xl font-bold mb-2">No notifications yet</h2>
            <p className="text-gray-500">
              When someone interacts with your tweets or profile, you'll see it here.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
