
'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Tweet from './Tweet';

export default function TweetFeed({ tweets: initialTweets = [] }) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialTweets.length >= 10);
  const [loading, setLoading] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0,
  });
  
  useEffect(() => {
    setTweets(initialTweets);
  }, [initialTweets]);
  
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreTweets();
    }
  }, [inView, hasMore]);
  
  const loadMoreTweets = async () => {
    setLoading(true);
    try {
      // This would be a real API call in a production app
      // const nextPage = await fetchMoreTweets(page + 1);
      // setTweets([...tweets, ...nextPage]);
      // setHasMore(nextPage.length >= 10);
      setPage(page + 1);
      
      // Simulating no more tweets for this demo
      setHasMore(false);
    } catch (error) {
      console.error('Failed to load more tweets:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (tweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-5xl mb-4">🐦</div>
        <h2 className="text-xl font-bold mb-2">No tweets yet</h2>
        <p className="text-gray-500">
          When new tweets are posted, they'll show up here.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet._id} tweet={tweet} />
      ))}
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Intersection observer sentinel */}
      <div ref={ref} className="h-10"></div>
    </div>
  );
}
