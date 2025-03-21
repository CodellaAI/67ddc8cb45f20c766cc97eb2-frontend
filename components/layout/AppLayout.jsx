
'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import MobileNav from './MobileNav';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AppLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto flex">
        {/* Left sidebar (hidden on mobile) */}
        <div className="hidden md:block md:w-1/4 xl:w-1/5 h-screen sticky top-0">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <main className="flex-1 border-l border-r border-extra-light-gray min-h-screen">
          {children}
        </main>
        
        {/* Right sidebar (hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/4 xl:w-1/4 h-screen sticky top-0 p-4">
          <RightSidebar />
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMobile && <MobileNav />}
    </div>
  );
}
