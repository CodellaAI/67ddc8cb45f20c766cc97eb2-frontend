
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRetweet, FaUserPlus, FaComment } from 'react-icons/fa';

export default function NotificationItem({ notification }) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like':
        return <FaHeart className="text-red-500" />;
      case 'retweet':
        return <FaRetweet className="text-green-500" />;
      case 'follow':
        return <FaUserPlus className="text-primary" />;
      case 'reply':
        return <FaComment className="text-primary" />;
      default:
        return null;
    }
  };
  
  const getNotificationText = () => {
    switch (notification.type) {
      case 'like':
        return 'liked your Tweet';
      case 'retweet':
        return 'retweeted your Tweet';
      case 'follow':
        return 'followed you';
      case 'reply':
        return 'replied to your Tweet';
      default:
        return '';
    }
  };
  
  return (
    <Link 
      href={notification.link || '#'}
      className={`flex p-4 hover:bg-gray-50 border-b border-extra-light-gray ${
        notification.read ? '' : 'bg-blue-50'
      }`}
    >
      <div className="mr-3 mt-1">
        {getNotificationIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start mb-1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-2">
            <Image 
              src={notification.user.profileImageUrl || 'https://via.placeholder.com/40'} 
              alt={notification.user.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <span className="font-bold hover:underline">{notification.user.name}</span>
            <span className="text-gray-500"> {getNotificationText()}</span>
          </div>
        </div>
        
        {notification.content && (
          <p className="text-gray-600 ml-12">{notification.content}</p>
        )}
        
        <div className="text-gray-500 text-sm ml-12 mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </div>
      </div>
    </Link>
  );
}
