
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import SearchBar from '@/components/common/SearchBar';
import TrendingTopics from '@/components/explore/TrendingTopics';
import WhoToFollow from '@/components/common/WhoToFollow';

export default function RightSidebar() {
  return (
    <div className="space-y-4">
      <SearchBar />
      
      <div className="bg-lightest-gray rounded-xl overflow-hidden">
        <TrendingTopics limit={3} />
        <div className="p-4">
          <Link href="/explore" className="text-primary hover:underline">
            Show more
          </Link>
        </div>
      </div>
      
      <div className="bg-lightest-gray rounded-xl overflow-hidden">
        <WhoToFollow />
      </div>
      
      <div className="text-xs text-gray-500 p-4">
        <div className="flex flex-wrap gap-2">
          <Link href="#" className="hover:underline">Terms of Service</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Cookie Policy</Link>
          <Link href="#" className="hover:underline">Accessibility</Link>
          <Link href="#" className="hover:underline">Ads info</Link>
          <Link href="#" className="hover:underline">More</Link>
        </div>
        <p className="mt-2">© 2023 Chirp, Inc.</p>
      </div>
    </div>
  );
}
