
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { FaRegComment, FaRetweet, FaRegHeart, FaHeart, FaShareAlt, FaEllipsisH } from 'react-icons/fa';
import { likeTweet, retweetTweet, deleteTweet } from '@/services/tweetService';
import { useAuth } from '@/hooks/useAuth';

export default function Tweet({ tweet, detailed = false }) {
  const [likes, setLikes] = useState(tweet.likes || 0);
  const [retweets, setRetweets] = useState(tweet.retweets || 0);
  const [isLiked, setIsLiked] = useState(tweet.isLiked || false);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted || false);
  const [showOptions, setShowOptions] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  
  const isAuthor = user && tweet.author._id === user._id;
  
  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await likeTweet(tweet._id);
      if (isLiked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to like tweet:', error);
    }
  };
  
  const handleRetweet = async (e) => {
    e.stopPropagation();
    try {
      await retweetTweet(tweet._id);
      if (isRetweeted) {
        setRetweets(retweets - 1);
      } else {
        setRetweets(retweets + 1);
      }
      setIsRetweeted(!isRetweeted);
    } catch (error) {
      console.error('Failed to retweet:', error);
    }
  };
  
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this tweet?')) {
      try {
        await deleteTweet(tweet._id);
        // Refresh the page or update state to remove the tweet
        router.refresh();
      } catch (error) {
        console.error('Failed to delete tweet:', error);
      }
    }
    setShowOptions(false);
  };
  
  const handleTweetClick = () => {
    if (!detailed) {
      router.push(`/tweet/${tweet._id}`);
    }
  };
  
  const toggleOptions = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };
  
  return (
    <div 
      className={`p-4 border-b border-extra-light-gray hover:bg-gray-50 transition-colors duration-200 ${
        !detailed ? 'cursor-pointer' : ''
      }`}
      onClick={handleTweetClick}
    >
      <div className="flex">
        {/* Author profile image */}
        <div className="mr-3">
          <Link 
            href={`/profile/${tweet.author.username}`}
            className="block relative w-12 h-12 rounded-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={tweet.author.profileImageUrl || 'https://via.placeholder.com/48'} 
              alt={tweet.author.name}
              fill
              className="object-cover"
            />
          </Link>
        </div>
        
        {/* Tweet content */}
        <div className="flex-1 min-w-0">
          {/* Tweet header */}
          <div className="flex items-center mb-1">
            <Link 
              href={`/profile/${tweet.author.username}`}
              className="font-bold hover:underline mr-1"
              onClick={(e) => e.stopPropagation()}
            >
              {tweet.author.name}
            </Link>
            <span className="text-gray-500 mr-1">@{tweet.author.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 ml-1">
              {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
            </span>
            
            {/* Tweet options */}
            <div className="ml-auto relative">
              <button 
                className="p-2 rounded-full hover:bg-blue-50 hover:text-primary transition-colors duration-200"
                onClick={toggleOptions}
              >
                <FaEllipsisH />
              </button>
              
              {showOptions && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 border border-extra-light-gray">
                  {isAuthor && (
                    <button 
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={handleDelete}
                    >
                      Delete Tweet
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Tweet text */}
          <div className="mb-3 whitespace-pre-wrap">
            {tweet.text}
          </div>
          
          {/* Tweet image if exists */}
          {tweet.imageUrl && (
            <div className="mb-3 rounded-xl overflow-hidden">
              <Image 
                src={tweet.imageUrl} 
                alt="Tweet image"
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* Tweet actions */}
          <div className="flex justify-between max-w-md">
            <button 
              className="flex items-center text-gray-500 hover:text-primary group"
              onClick={(e) => {
                e.stopPropagation();
                if (!detailed) router.push(`/tweet/${tweet._id}`);
              }}
            >
              <div className="p-2 group-hover:bg-blue-50 rounded-full mr-1">
                <FaRegComment />
              </div>
              <span>{tweet.replies || 0}</span>
            </button>
            
            <button 
              className={`flex items-center ${isRetweeted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'} group`}
              onClick={handleRetweet}
            >
              <div className="p-2 group-hover:bg-green-50 rounded-full mr-1">
                <FaRetweet />
              </div>
              <span>{retweets}</span>
            </button>
            
            <button 
              className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} group`}
              onClick={handleLike}
            >
              <div className="p-2 group-hover:bg-red-50 rounded-full mr-1">
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </div>
              <span>{likes}</span>
            </button>
            
            <button 
              className="flex items-center text-gray-500 hover:text-primary group"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 group-hover:bg-blue-50 rounded-full mr-1">
                <FaShareAlt />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
