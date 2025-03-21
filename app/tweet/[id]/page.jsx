
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import Tweet from '@/components/tweets/Tweet';
import TweetReplyForm from '@/components/tweets/TweetReplyForm';
import TweetReplies from '@/components/tweets/TweetReplies';
import { fetchTweet, fetchTweetReplies } from '@/services/tweetService';

export default function TweetPage() {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTweetData = async () => {
      try {
        const tweetData = await fetchTweet(id);
        setTweet(tweetData);
        
        const repliesData = await fetchTweetReplies(id);
        setReplies(repliesData);
      } catch (error) {
        console.error('Failed to fetch tweet data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTweetData();
    }
  }, [id]);

  const handleNewReply = (newReply) => {
    setReplies([newReply, ...replies]);
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

  if (!tweet) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-xl font-bold">Tweet not found</h1>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Tweet</h1>
        </div>
        
        <div className="border-b">
          <Tweet tweet={tweet} detailed={true} />
        </div>
        
        <TweetReplyForm tweetId={id} onReplyCreated={handleNewReply} />
        
        <div className="border-t">
          <h2 className="text-lg font-bold p-4">Replies</h2>
          <TweetReplies replies={replies} />
        </div>
      </div>
    </AppLayout>
  );
}
