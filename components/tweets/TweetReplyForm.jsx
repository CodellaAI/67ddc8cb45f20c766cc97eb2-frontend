
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaImage, FaSmile } from 'react-icons/fa';
import { replyToTweet } from '@/services/tweetService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

export default function TweetReplyForm({ tweetId, onReplyCreated }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error('Your reply cannot be empty');
      return;
    }
    
    setLoading(true);
    
    try {
      const newReply = await replyToTweet(tweetId, { text });
      
      setText('');
      
      if (onReplyCreated) {
        onReplyCreated(newReply);
      }
      
      toast.success('Reply posted!');
    } catch (error) {
      toast.error('Failed to post reply');
      console.error('Failed to create reply:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-4 border-b border-extra-light-gray">
      <div className="flex">
        {/* User profile image */}
        <div className="mr-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image 
              src={user?.profileImageUrl || 'https://via.placeholder.com/48'} 
              alt={user?.name || 'User'}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Reply composer */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full border-0 focus:ring-0 text-xl resize-none mb-4"
              placeholder="Tweet your reply"
              value={text}
              onChange={handleTextChange}
              rows={2}
              maxLength={280}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button type="button" className="text-primary p-2 rounded-full hover:bg-blue-50">
                  <FaImage />
                </button>
                <button type="button" className="text-primary p-2 rounded-full hover:bg-blue-50">
                  <FaSmile />
                </button>
              </div>
              
              <div className="flex items-center">
                {text.length > 0 && (
                  <div className="mr-3">
                    <span className={`${text.length >= 260 ? 'text-danger' : 'text-gray-500'}`}>
                      {280 - text.length}
                    </span>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading || !text.trim()}
                >
                  {loading ? 'Replying...' : 'Reply'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
