
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Hero image */}
      <div className="bg-primary md:w-1/2 relative hidden md:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <FaTwitter className="text-white text-9xl" />
        </div>
      </div>
      
      {/* Right side - Content */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <FaTwitter className="text-primary text-5xl mb-8 md:hidden" />
        
        <h1 className="text-5xl font-bold mb-6">Happening now</h1>
        <h2 className="text-3xl font-bold mb-8">Join Chirp today.</h2>
        
        <div className="space-y-4 max-w-md">
          <Link href="/signup" className="btn-primary block text-center">
            Sign up with email
          </Link>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">or</span>
            </div>
          </div>
          
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
