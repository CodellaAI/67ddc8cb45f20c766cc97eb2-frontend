
'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TweetFeed from '@/components/tweets/TweetFeed';
import { fetchTrendingTweets } from '@/services/tweetService';
import SearchBar from '@/components/common/SearchBar';
import TrendingTopics from '@/components/explore/TrendingTopics';

export default function ExplorePage() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingTweets = async () => {
      try {
        const trendingTweets = await fetchTrendingTweets();
        setTweets(trendingTweets);
      } catch (error) {
        console.error('Failed to fetch trending tweets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingTweets();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 bg-white z-10 p-2">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h1 className="text-xl font-bold p-4">Explore</h1>
            
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <TweetFeed tweets={tweets} />
            )}
          </div>
          
          <div className="hidden md:block">
            <TrendingTopics />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
