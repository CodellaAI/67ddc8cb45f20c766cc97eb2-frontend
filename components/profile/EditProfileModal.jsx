
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaTimes, FaCamera } from 'react-icons/fa';
import { updateProfile } from '@/services/userService';
import { toast } from 'react-toastify';

export default function EditProfileModal({ profile, onClose, onProfileUpdated }) {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    bio: profile.bio || '',
    location: profile.location || '',
    website: profile.website || '',
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(profile.profileImageUrl || null);
  
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(profile.coverImageUrl || null);
  
  const [loading, setLoading] = useState(false);
  
  const profileImageInputRef = useRef();
  const coverImageInputRef = useRef();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Append images if selected
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }
      
      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }
      
      const updatedProfile = await updateProfile(formDataToSend);
      
      toast.success('Profile updated successfully!');
      
      if (onProfileUpdated) {
        onProfileUpdated(updatedProfile);
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-xl w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-blue-50 mr-4"
              onClick={onClose}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold">Edit profile</h2>
          </div>
          
          <button 
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
        
        {/* Cover image */}
        <div className="h-48 bg-gray-200 relative">
          {coverImagePreview && (
            <Image
              src={coverImagePreview}
              alt="Cover"
              fill
              className="object-cover"
            />
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageChange}
              ref={coverImageInputRef}
            />
            <button 
              className="bg-black bg-opacity-50 text-white p-3 rounded-full"
              onClick={() => coverImageInputRef.current.click()}
            >
              <FaCamera />
            </button>
          </div>
        </div>
        
        {/* Profile image */}
        <div className="relative mx-4 -mt-16 mb-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
            <Image 
              src={profileImagePreview || 'https://via.placeholder.com/128'} 
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
              ref={profileImageInputRef}
            />
            <button 
              className="bg-black bg-opacity-50 text-white p-3 rounded-full"
              onClick={() => profileImageInputRef.current.click()}
            >
              <FaCamera />
            </button>
          </div>
        </div>
        
        {/* Form */}
        <form className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              maxLength={50}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.name.length}/50
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="input-field"
              rows={3}
              maxLength={160}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.bio.length}/160
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              maxLength={30}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
