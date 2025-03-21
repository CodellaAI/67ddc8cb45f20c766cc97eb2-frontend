
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaLink, 
  FaArrowLeft, 
  FaRegEnvelope 
} from 'react-icons/fa';
import { format } from 'date-fns';
import { followUser, unfollowUser } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import EditProfileModal from './EditProfileModal';

export default function ProfileHeader({ profile, isOwnProfile }) {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);
  const [followerCount, setFollowerCount] = useState(profile.followers);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(profile._id);
        setFollowerCount(followerCount - 1);
      } else {
        await followUser(profile._id);
        setFollowerCount(followerCount + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
    }
  };
  
  const handleEditProfile = () => {
    setShowEditModal(true);
  };
  
  const handleProfileUpdated = (updatedProfile) => {
    // In a real app, you would update the profile state here
    setShowEditModal(false);
    router.refresh();
  };
  
  return (
    <>
      <div className="sticky top-0 z-10 bg-white p-4 flex items-center border-b">
        <button 
          className="p-2 rounded-full hover:bg-blue-50 mr-4"
          onClick={() => router.back()}
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-gray-500 text-sm">{profile.tweetCount} Tweets</p>
        </div>
      </div>
      
      {/* Cover image */}
      <div className="h-48 bg-primary relative">
        {profile.coverImageUrl && (
          <Image
            src={profile.coverImageUrl}
            alt="Cover"
            fill
            className="object-cover"
          />
        )}
      </div>
      
      {/* Profile info section */}
      <div className="p-4 border-b relative">
        {/* Profile image */}
        <div className="absolute -top-16 left-4 border-4 border-white rounded-full">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image 
              src={profile.profileImageUrl || 'https://via.placeholder.com/128'} 
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Follow/Edit button */}
        <div className="flex justify-end mb-12">
          {isOwnProfile ? (
            <button 
              className="btn-secondary"
              onClick={handleEditProfile}
            >
              Edit profile
            </button>
          ) : (
            <button 
              className={isFollowing ? "btn-secondary" : "btn-primary"}
              onClick={handleFollowToggle}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
        
        {/* Name and username */}
        <div className="mb-3">
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-gray-500">@{profile.username}</p>
        </div>
        
        {/* Bio */}
        {profile.bio && (
          <p className="mb-3">{profile.bio}</p>
        )}
        
        {/* Additional info */}
        <div className="flex flex-wrap text-gray-500 mb-3 gap-x-4">
          {profile.location && (
            <div className="flex items-center mr-4">
              <FaMapMarkerAlt className="mr-1" />
              <span>{profile.location}</span>
            </div>
          )}
          
          {profile.website && (
            <div className="flex items-center mr-4">
              <FaLink className="mr-1" />
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {profile.website.replace(/(^\w+:|^)\/\//, '')}
              </a>
            </div>
          )}
          
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            <span>Joined {format(new Date(profile.createdAt), 'MMMM yyyy')}</span>
          </div>
        </div>
        
        {/* Followers/Following count */}
        <div className="flex space-x-4">
          <div>
            <span className="font-bold">{profile.following}</span>{' '}
            <span className="text-gray-500">Following</span>
          </div>
          <div>
            <span className="font-bold">{followerCount}</span>{' '}
            <span className="text-gray-500">Followers</span>
          </div>
        </div>
      </div>
      
      {showEditModal && (
        <EditProfileModal 
          profile={profile} 
          onClose={() => setShowEditModal(false)} 
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </>
  );
}
