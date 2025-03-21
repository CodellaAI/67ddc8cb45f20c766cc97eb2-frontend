
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEllipsisH } from 'react-icons/fa';
import { fetchTrendingTopics } from '@/services/trendingService';

export default function TrendingTopics({ limit }) {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTrends = async () => {
      try {
        const trendingTopics = await fetchTrendingTopics();
        setTrends(limit ? trendingTopics.slice(0, limit) : trendingTopics);
      } catch (error) {
        console.error('Failed to fetch trending topics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTrends();
  }, [limit]);
  
  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Trends for you</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(limit || 5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-lightest-gray rounded-xl overflow-hidden">
      <h2 className="text-xl font-bold p-4">Trends for you</h2>
      
      <div>
        {trends.map((trend) => (
          <Link 
            key={trend.id}
            href={`/search?q=${encodeURIComponent(trend.name)}`}
            className="block p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex justify-between">
              <div className="text-gray-500 text-sm">{trend.category}</div>
              <button className="text-gray-500 hover:text-primary hover:bg-blue-50 rounded-full p-2">
                <FaEllipsisH />
              </button>
            </div>
            
            <div className="font-bold my-0.5">{trend.name}</div>
            
            <div className="text-gray-500 text-sm">{trend.tweetCount.toLocaleString()} Tweets</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
