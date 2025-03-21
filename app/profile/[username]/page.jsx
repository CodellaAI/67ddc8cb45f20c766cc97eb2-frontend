
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import ProfileHeader from '@/components/profile/ProfileHeader';
import TweetFeed from '@/components/tweets/TweetFeed';
import { fetchUserProfile, fetchUserTweets } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import TabMenu from '@/components/profile/TabMenu';

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [activeTab, setActiveTab] = useState('tweets');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const isOwnProfile = user?.username === username;

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        setProfile(userProfile);
        
        const userTweets = await fetchUserTweets(username);
        setTweets(userTweets);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadProfileData();
    }
  }, [username]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Here you would fetch different data based on the active tab
    // For example, fetch liked tweets, replies, etc.
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  if (!profile) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-xl font-bold">User not found</h1>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
        
        <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
        
        <div className="border-t border-extra-light-gray">
          {activeTab === 'tweets' && <TweetFeed tweets={tweets} />}
          {activeTab === 'replies' && <div className="p-4 text-center text-gray-500">Replies will be shown here</div>}
          {activeTab === 'media' && <div className="p-4 text-center text-gray-500">Media tweets will be shown here</div>}
          {activeTab === 'likes' && <div className="p-4 text-center text-gray-500">Liked tweets will be shown here</div>}
        </div>
      </div>
    </AppLayout>
  );
}
