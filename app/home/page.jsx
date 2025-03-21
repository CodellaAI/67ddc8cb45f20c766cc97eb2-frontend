
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import TweetFeed from '@/components/tweets/TweetFeed';
import TweetComposer from '@/components/tweets/TweetComposer';
import { useAuth } from '@/hooks/useAuth';
import { fetchTimeline } from '@/services/tweetService';

export default function HomePage() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
      return;
    }

    const loadTimeline = async () => {
      try {
        const timelineTweets = await fetchTimeline();
        setTweets(timelineTweets);
      } catch (error) {
        console.error('Failed to fetch timeline:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadTimeline();
    }
  }, [isAuthenticated, router, loading]);

  const handleNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
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

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold p-4 border-b">Home</h1>
        
        <TweetComposer onTweetCreated={handleNewTweet} />
        
        <div className="border-t border-extra-light-gray">
          <TweetFeed tweets={tweets} />
        </div>
      </div>
    </AppLayout>
  );
}
