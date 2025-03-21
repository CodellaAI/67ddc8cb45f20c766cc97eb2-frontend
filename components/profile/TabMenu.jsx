
'use client';

export default function TabMenu({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'tweets', label: 'Tweets' },
    { id: 'replies', label: 'Replies' },
    { id: 'media', label: 'Media' },
    { id: 'likes', label: 'Likes' },
  ];
  
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 py-4 text-center font-medium hover:bg-blue-50 transition-colors duration-200 ${
            activeTab === tab.id 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
