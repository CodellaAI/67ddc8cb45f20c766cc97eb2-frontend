
'use client';

import Tweet from './Tweet';

export default function TweetReplies({ replies = [] }) {
  if (replies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-5xl mb-4">💬</div>
        <h2 className="text-xl font-bold mb-2">No replies yet</h2>
        <p className="text-gray-500">
          Be the first to reply to this Tweet!
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {replies.map((reply) => (
        <Tweet key={reply._id} tweet={reply} />
      ))}
    </div>
  );
}
