
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSuggestedUsers } from '@/services/userService';

export default function WhoToFollow() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadSuggestedUsers = async () => {
      try {
        const suggestedUsers = await getSuggestedUsers();
        setUsers(suggestedUsers);
      } catch (error) {
        console.error('Failed to fetch suggested users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSuggestedUsers();
  }, []);
  
  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold p-4">Who to follow</h2>
      
      <div>
        {users.map((user) => (
          <div 
            key={user._id}
            className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <Link 
              href={`/profile/${user.username}`}
              className="relative w-12 h-12 rounded-full overflow-hidden mr-3"
            >
              <Image 
                src={user.profileImageUrl || 'https://via.placeholder.com/48'} 
                alt={user.name}
                fill
                className="object-cover"
              />
            </Link>
            
            <div className="flex-1 min-w-0 mr-3">
              <Link href={`/profile/${user.username}`} className="hover:underline">
                <h3 className="font-bold truncate">{user.name}</h3>
                <p className="text-gray-500 truncate">@{user.username}</p>
              </Link>
            </div>
            
            <button className="btn-primary text-sm py-1">
              Follow
            </button>
          </div>
        ))}
      </div>
      
      <div className="p-4">
        <Link href="/connect" className="text-primary hover:underline">
          Show more
        </Link>
      </div>
    </div>
  );
}
