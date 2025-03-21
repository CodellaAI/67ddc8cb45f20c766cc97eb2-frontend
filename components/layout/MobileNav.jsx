
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaHashtag, FaBell, FaEnvelope, FaFeatherAlt } from 'react-icons/fa';

export default function MobileNav() {
  const pathname = usePathname();
  
  const navItems = [
    { icon: FaHome, path: '/home' },
    { icon: FaHashtag, path: '/explore' },
    { icon: FaBell, path: '/notifications' },
    { icon: FaEnvelope, path: '/messages' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-extra-light-gray md:hidden">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex items-center justify-center w-full h-full ${
              pathname === item.path ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <item.icon className="text-xl" />
          </Link>
        ))}
        
        <Link href="/compose/tweet" className="flex items-center justify-center w-full h-full">
          <div className="bg-primary text-white p-2 rounded-full">
            <FaFeatherAlt />
          </div>
        </Link>
      </div>
    </div>
  );
}
