
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaImage, FaSmile, FaCalendarAlt, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { createTweet } from '@/services/tweetService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

export default function TweetComposer({ onTweetCreated }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef();
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImage(null);
    setImagePreview('');
    fileInputRef.current.value = '';
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim() && !image) {
      toast.error('Your tweet cannot be empty');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('text', text);
      if (image) {
        formData.append('image', image);
      }
      
      const newTweet = await createTweet(formData);
      
      setText('');
      setImage(null);
      setImagePreview('');
      
      if (onTweetCreated) {
        onTweetCreated(newTweet);
      }
      
      toast.success('Tweet posted!');
    } catch (error) {
      toast.error('Failed to post tweet');
      console.error('Failed to create tweet:', error);
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
        
        {/* Tweet composer */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full border-0 focus:ring-0 text-xl resize-none mb-4"
              placeholder="What's happening?"
              value={text}
              onChange={handleTextChange}
              rows={2}
              maxLength={280}
            />
            
            {/* Image preview */}
            {imagePreview && (
              <div className="relative mb-4 rounded-xl overflow-hidden">
                <Image 
                  src={imagePreview} 
                  alt="Tweet image preview"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover max-h-80"
                />
                <button 
                  type="button"
                  className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full"
                  onClick={removeImage}
                >
                  <FaTimes />
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                <button 
                  type="button"
                  className="text-primary p-2 rounded-full hover:bg-blue-50"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaImage />
                </button>
                <button type="button" className="text-primary p-2 rounded-full hover:bg-blue-50">
                  <FaSmile />
                </button>
                <button type="button" className="text-primary p-2 rounded-full hover:bg-blue-50">
                  <FaCalendarAlt />
                </button>
                <button type="button" className="text-primary p-2 rounded-full hover:bg-blue-50">
                  <FaMapMarkerAlt />
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
                  disabled={loading || (!text.trim() && !image)}
                >
                  {loading ? 'Posting...' : 'Tweet'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
