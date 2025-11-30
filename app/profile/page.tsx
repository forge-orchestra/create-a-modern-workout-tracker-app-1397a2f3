'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { User } from '@/types';
import { fetchUserProfile, updateUserProfile } from '@/services/userService';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setUser(userProfile);
      } catch (err) {
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    loadUserProfile();
  }, []);

  const handleUpdateProfile = async (updatedUser: User) => {
    try {
      setLoading(true);
      await updateUserProfile(updatedUser);
      setUser(updatedUser);
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <LucideIcon name="user" className="w-6 h-6 mr-2" />
            <span className="text-lg">{user.name}</span>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={() => router.push('/settings')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;