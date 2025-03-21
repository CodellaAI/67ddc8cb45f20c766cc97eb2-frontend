
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  FaTwitter, 
  FaHome, 
  FaHashtag, 
  FaBell, 
  FaEnvelope, 
  FaBookmark, 
  FaList, 
  FaUser, 
  FaEllipsisH,
  FaFeatherAlt
} from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  const navItems = [
    { icon: FaHome, label: 'Home', path: '/home' },
    { icon: FaHashtag, label: 'Explore', path: '/explore' },
    { icon: FaBell, label: 'Notifications', path: '/notifications' },
    { icon: FaEnvelope, label: 'Messages', path: '/messages' },
    { icon: FaBookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: FaList, label: 'Lists', path: '/lists' },
    { icon: FaUser, label: 'Profile', path: user ? `/profile/${user.username}` : '/profile' },
    { icon: FaEllipsisH, label: 'More', path: '#' },
  ];
  
  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4 pl-3">
        <Link href="/home">
          <FaTwitter className="text-primary text-3xl" />
        </Link>
      </div>
      
      <nav className="mb-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.path}
                className={`flex items-center p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 ${
                  pathname === item.path ? 'font-bold' : ''
                }`}
              >
                <item.icon className={`text-xl mr-4 ${pathname === item.path ? 'text-primary' : ''}`} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <button className="btn-primary flex items-center justify-center w-full py-3 mb-4">
        <FaFeatherAlt className="mr-2" />
        <span>Tweet</span>
      </button>
      
      {user && (
        <div className="mt-auto flex items-center p-3 rounded-full hover:bg-blue-50 cursor-pointer" onClick={handleLogout}>
          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image 
              src={user.profileImageUrl || 'https://via.placeholder.com/40'} 
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold truncate">{user.name}</p>
            <p className="text-gray-500 truncate">@{user.username}</p>
          </div>
          <FaEllipsisH className="text-gray-500 ml-2" />
        </div>
      )}
    </div>
  );
}
